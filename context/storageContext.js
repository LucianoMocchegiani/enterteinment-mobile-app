import { createContext , useContext, useEffect, useState, } from 'react';

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
        finishied:[], 
        whaching_now:[], 
        last_conection:null,
        online:false,
        updated_date:null, 
        created_date:null,
    })

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
                finishied:[], 
                whaching_now:[], 
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
    const {profiles, rented} = userStorage
    const { finishied, whaching_now, my_list_movies, my_list_series, name, avatar} = profile

    useEffect(()=>{
        return ()=>{
            putProfile(profile)
        }
    },[])
    
    return (
        <storageContext.Provider value={{handleSetProfile, handleSetUser, profiles, rented, finishied, whaching_now, my_list_movies, my_list_series, name, avatar, userStorage }}>
            {children}
        </storageContext.Provider>
    )
}


