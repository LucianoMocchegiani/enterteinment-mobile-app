import { createContext , useContext, useEffect, useState, useRef} from 'react';
import { putProfile, getProfile } from '../firebase/endpoints/profiles';
import { useAuth } from './authContext';
import { getUserDetail } from '../firebase/endpoints/users';

export const storageContext = createContext();
export function useStorage (){
    const context = useContext(storageContext)
    return context
}

export function StorageProvider({children}){
    const {user}= useAuth()
    const [userStorage, setUserStorage] = useState({
        id:null,
        dni:null,
        password:null,
        fatture:[],
        name:null,
        email:null,
        location:null,
        plan:null,
        profiles:[],
        rented:[],
        online:false,
        last_conection:null,
        updated_date:null, 
        created_date:null,
    })
    const [profile, setProfile] = useState({
        id:null,
        name:null,
        account_id:null, 
        avatar:null, 
        my_list_movies:[], 
        my_list_series:[], 
        finishied_movies:[], 
        finishied_series:[], 
        keep_watching_series:[], 
        keep_watching_movies:[], 
        whaching_now_series:[], 
        whaching_now_movies:[],
        last_conection:null,
        online:false,
        updated_date:null, 
        created_date:null,
    })
    const movieDataRef = useRef({})
    const positionMillisRef = useRef(0)
    const durationMillisRef = useRef(0)

    const setMovieDataRef = (data)=>{
        movieDataRef.current = data
    }

    const setPositionMillis = (value)=>{
        positionMillisRef.current = value
    }

    const setDurationMillis = (value)=>{
        durationMillisRef.current = value
    }

    const updateOnlineStateAndLastConection = async ()=>{
        await putProfile(profile)

    }

    const handleSetUser = async ()=>{
        try{
            setUserStorage({
                id:null,
                dni:null,
                password:null,
                fatture:[],
                name:null,
                email:null,
                location:null,
                plan:null,
                profiles:[],
                rented:[],
                online:false,
                last_conection:null,
                updated_date:null, 
                created_date:null,
            })
            const { data, success, message} = await getUserDetail(user?.email)
            setUserStorage({
                ...data
            })
            return ({ data, success, message})
        }
        catch(error){
            return ({success: false, message:error.message})
        }
    }

    const handleSetProfile = async (profileId)=>{
        try{
            setProfile({
                id:null,
                name:null,
                account_id:null, 
                avatar:null, 
                my_list_movies:[], 
                my_list_series:[], 
                finishied_movies:[], 
                finishied_series:[], 
                keep_watching_series:[], 
                keep_watching_movies:[], 
                whaching_now_series:[], 
                whaching_now_movies:[],
                last_conection:null,
                online:false,
                updated_date:null, 
                created_date:null,
            })
            const { data, success, message} = await getProfile(profileId)
            setProfile({
                ...data
            })
            return ({ data, success, message})
        }
        catch(error){
            return ({success: false, message:error.message})
        }
    }

    const setMyListMovies = async (movie)=>{
        try{
            if(!movie){return}
            const filterMovie = my_list_movies.length?[...profile.my_list_movies.filter(e => e?.id === movie?.id)]:[]
            const exist=filterMovie.length?true:false
            if(!exist){
                let response = await putProfile({...profile, my_list_movies:[...profile.my_list_movies, movie]})
                if(response.success){
                    setProfile({
                        ...profile, my_list_movies:[...profile.my_list_movies, movie]
                    })
                    return response
                }else{
                    return response
                }
            }else{
                let response = await putProfile({...profile, my_list_movies:[...profile.my_list_movies.filter(e => e?.id != movie?.id)]})
                if(response.success){
                    setProfile({
                        ...profile, my_list_movies:[...profile.my_list_movies.filter(e => e?.id != movie?.id)]
                    })
                    return response
                }else{
                    return response
                }
            }
        }catch(error){
            let response = {success: false, message:error.message}
            console.log({errorIn:'setMyListMovies',...response})
            return response
        }
    }

    const setMyListSeries = async (serie)=>{
        try{
            if(!serie){return}
            const filterSerie = my_list_series.length?[...my_list_series.filter(e => e?.id === serie?.id)]:[]
            const exist=filterSerie.length?true:false
            if(!exist){
                let response = await putProfile({...profile, my_list_series:[...profile.my_list_series, serie]})
                setProfile({
                    ...profile, my_list_series:[...profile.my_list_series, serie]
                })
                return response
            }else{
                let response = await putProfile({...profile, my_list_series:[...profile.my_list_series.filter(e => e?.id != serie?.id)]})
                setProfile({
                    ...profile, my_list_series:[...profile.my_list_series.filter(e => e?.id != serie?.id)]
                })
                return response
            }
        }catch(error){
            let response = {success: false, message:error.message}
            console.log(response)
            return response
        }
    }

    const getPositionMillisMovie = (movieId)=>{
        try{
            const filterMovie = keep_watching_movies.length?[...keep_watching_movies.filter(e => e?.id === movieId)]:[]
            const exist=filterMovie.length?true:false
            if(exist){
                let positionMillis = filterMovie[0].positionMillis?filterMovie[0].positionMillis:0
                return {positionMillis:positionMillis}

            }else{
                return {positionMillis:0}
            }
        }catch(error){
            let response = {errorIn:positionMillis ,succes:false, message:error.message}
            console.log(response)
            return response 
        }
    }
    
    const getPositionMillisSerie = (id)=>{
        try{
            const filterSerie = keep_watching_series.length?[...keep_watching_series.filter(e => e?.id === id)]:[]
            const exist=filterSerie.length?true:false
            if(exist){
                let positionMillis = filterSerie[0].positionMillis?filterSerie[0].positionMillis:0
                return {positionMillis:positionMillis}

            }else{
                return {positionMillis:0}
            }
        }catch(error){
            let response = {errorIn:'getPositionMillisSerie' ,succes:false, message:error.message}
            console.log(response)
            return response 
        }
    }

    const setFinishiedSeries = async (serie)=>{
        try{
            if(!serie){return}
            const filterSerie = finishied_series.length?[...finishied_series.filter(e => e?.id === serie?.id)]:[]
            const exist=filterSerie.length?true:false
            if(!exist){
                let removeWatchingSerie = [...profile.keep_watching_series.filter(e => e?.id != serie?.id)]
                let response = await putProfile({...profile, finishied_series:[serie, ...profile.finishied_series], keep_watching_series:removeWatchingSerie})
                setProfile({
                    ...profile, finishied_series:[serie, ...profile.finishied_series], keep_watching_series:removeWatchingSerie
                })
                return response
            }else{
                let removeWatchingSerie = [...profile.keep_watching_series.filter(e => e?.id != serie?.id)]
                let removeSerie = [...profile.finishied_series.filter(e => e?.id != serie?.id)]
                let replaceSerie =[serie, ...removeSerie]
                let response = await putProfile({...profile, finishied_series:replaceSerie, keep_watching_series:removeWatchingSerie})
                setProfile({
                    ...profile, finishied_series:replaceSerie, keep_watching_series:removeWatchingSerie
                })
                return response
            }
        }catch(error){
            let response = {errorIn:'setFinishiedSeries',success: false, message:error.message}
            console.log(response)
            return response
        }
    }

    const setKeepWatchingSeries = async (serie)=>{
        try{
            if(!serie){return}
            if(serie.positionMillis >= serie.durationMillis*0.90){
                return await setFinishiedSeries(serie)
            }else{
                const filterSerie = keep_watching_series.length?[...keep_watching_series.filter(e => e?.id === serie?.id)]:[]
                const exist=filterSerie.length?true:false
                if(!exist){
                    let response = await putProfile({...profile, keep_watching_series:[serie, ...profile.keep_watching_series]})
                    setProfile({
                        ...profile, keep_watching_series:[serie, ...profile.keep_watching_series]
                    })
                    return response
                }else{
                    let removeSerie = [...profile.keep_watching_series.filter(e => e?.id != serie?.id)]
                    let replaceSerie =[serie, ...removeSerie]
                    let response = await putProfile({...profile, keep_watching_series:replaceSerie})
                    setProfile({
                        ...profile, keep_watching_series:replaceSerie
                    })
                    return response
                }
            }
           
        }catch(error){
            let response = {errorIn:'setKeepWatchingSeries',success: false, message:error.message}
            console.log(response)
            return response
        }
    }

    const setFinishiedMovies= async (movie)=>{
        try{
            if(!movie){return}
            const filterMovie = finishied_movies.length?[...finishied_movies.filter(e => e?.id === movie?.id)]:[]
            const exist=filterMovie.length?true:false
            if(!exist){
                let removeWatchingMovie = [...profile.keep_watching_movies.filter(e => e?.id != movie?.id)]
                let response = await putProfile({...profile, finishied_movies:[movie, ...profile.finishied_movies], keep_watching_movies:removeWatchingMovie})
                setProfile({
                    ...profile, finishied_movies:[movie, ...profile.finishied_movies], keep_watching_movies:removeWatchingMovie
                })
                return response
            }else{
                let removeWatchingMovie = [...profile.keep_watching_movies.filter(e => e?.id != movie?.id)]
                let removeMovie = [...profile.finishied_movies.filter(e => e?.id != movie?.id)]
                let replaceMovie =[movie, ...removeMovie]
                let response = await putProfile({...profile, finishied_movies:replaceMovie, keep_watching_movies:removeWatchingMovie})
                setProfile({
                    ...profile, finishied_movies:replaceMovie, keep_watching_movies:removeWatchingMovie
                })
                return response
            }
        }catch(error){
            let response = {errorIn:'setFinishiedMovies',success: false, message:error.message}
            console.log(response)
            return response
        }
    }

    const setKeepWatchingMovies= async (movie)=>{
        try{
            if(!movie){return}
            if(movie.positionMillis >= movie.durationMillis*0.90){
                return await setFinishiedMovies(movie)
            }else{
                const filterMovie = keep_watching_movies.length?[...keep_watching_movies.filter(e => e?.id === movie?.id)]:[]
                const exist=filterMovie.length?true:false
                if(!exist){
                    let response = await putProfile({...profile, keep_watching_movies:[movie, ...profile.keep_watching_movies]})
                    setProfile({
                        ...profile, keep_watching_movies:[movie, ...profile.keep_watching_movies]
                    })
                    return response
                }else{
                    let removeMovie = [...profile.keep_watching_movies.filter(e => e?.id != movie?.id)]
                    let replaceMovie =[movie, ...removeMovie]
                    let response = await putProfile({...profile, keep_watching_movies:replaceMovie})
                    setProfile({
                        ...profile, keep_watching_movies:replaceMovie
                    })
                    return response
                }
            }
        }catch(error){
            let response = {errorIn:'setKeepWatchingMovies',success: false, message:error.message}
            console.log(response)
            return response
        }
    }

    const {profiles, rented} = userStorage
    const { finishied_movies, finishied_series, whaching_now_movies, whaching_now_series, my_list_movies, my_list_series, keep_watching_series, keep_watching_movies, name, avatar} = profile

    useEffect(()=>{
        return ()=>{
            putProfile({...profile, online:false})
        }
    },[])
    
    return (
        <storageContext.Provider value={{getPositionMillisMovie , getPositionMillisSerie, setKeepWatchingSeries, setKeepWatchingMovies, setMyListSeries, setMyListMovies, handleSetProfile, handleSetUser, profiles, rented, finishied_movies, finishied_series, whaching_now_movies, whaching_now_series, my_list_movies, my_list_series, keep_watching_series, keep_watching_movies, name, avatar, userStorage, setPositionMillis, positionMillisRef, setMovieDataRef, movieDataRef, setDurationMillis, durationMillisRef}}>
            {children}
        </storageContext.Provider>
    )
}


