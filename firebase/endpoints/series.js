import { doc , getDoc, collection, getDocs, query, orderBy, where, limit, setDoc, deleteDoc, addDoc, getDocFromCache, getDocsFromCache, startAfter, Timestamp, } from 'firebase/firestore';
import { db, storage } from '../firebase';
import axios from 'axios'
import algoliasearch from 'algoliasearch/lite'

export const searchSeries=  async (search)=>{
    //api
    try {
        let response = { success:false, message:'Reintente nuevamente en unos momentos' };
        if(typeof search !== 'string'){
            response = { success:false, message:'Search is not string or is undefine' };
            console.log(response);
            return response;
        }
        const patch = 'https://api.themoviedb.org/3/search/tv?api_key=70e07702fea1b3da15a2e2fee1d08057&language=es&query='+search
        const request = await axios.get(patch)
        response = { success:true, message:'Series encontradas', data: request.data.results};
            
        return response
    } catch (error) {
        let response = { success:false, message:error.message };
        console.log(response)
        return response
    }
}

export const getPremieres=  async ( 
    options = {
        page:1, 
        setState:(e)=>console.log(e), 
        prevState:[],
    })=>
    {
    //api
    try {
        const{ page, setState, prevState}=options
        let response = { success:false, message:'Reintente nuevamente en unos momentos' };
        const patch = 'https://api.themoviedb.org/3/tv/airing_today?api_key=70e07702fea1b3da15a2e2fee1d08057&language=es&page='+page
        const request = await axios.get(patch)
        response = { success:true, message:'Estrenos encontrados', data: request.data.results};
        setState([...prevState, ...request.data.results])
        return response
    } catch (error) {
        let response = { success:false, message:error.message };
        console.log(response)
        return response
    }
}


export const searchSeriesAlgolia = async (search) =>{
    let response
    try {
        const APPLICATION_ID = 'K7DJSQSIE8'
        const SEARCH_API_KEY = '8233808a4024df9610f4720a1a15c41d'
        const ALGOLIA_INDEX = 'entertainment-app-serie'
        const client = algoliasearch(APPLICATION_ID, SEARCH_API_KEY)
        const index = client.initIndex(ALGOLIA_INDEX)
        const {hits} = await index.search(search, {
            hitsPerPage: 5
        })
        response = { success:true, message: 'Series obtenidas', data:hits};
        console.log(response)
        return response
    } catch(error) {
        response = { success:false, message: error.message };
        console.log(response)
        return response
    }
}

export const getSerieEpisode = async (options)=>{
    //api
    try {
        const {id, season, episode} = options
        let response = { success:false, message:'Reintente nuevamente en unos momentos' };
        if(typeof Number(id) !== 'number'){
            response = { success:false, message:'The value is not valid' };
            console.log(response);
            return response;
        }
        const patch = 'https://api.themoviedb.org/3/tv/'+Number(id)+'/season/'+Number(season)+'/episode/'+Number(episode)+'?api_key=70e07702fea1b3da15a2e2fee1d08057&language=es'
        const request = await axios.get(patch)
        response = { success:true, message:'capitulo'+Number(episode)+' de la temporada'+Number(season)+'obtenido', data: request.data};
        console.log(response)
        return response
    } catch (error) {
        let response = { success:false, message:error.message };
        console.log(response)
        return response
    }
}
export const getSerieDetail=  async (id)=>{
    //api
    try {
        let response = { success:false, message:'Reintente nuevamente en unos momentos' };
        if(typeof Number(id) !== 'number'){
            response = { success:false, message:'Id value is not valid' };
            console.log(response);
            return response;
        }
        const patch = 'https://api.themoviedb.org/3/tv/'+Number(id)+'?api_key=70e07702fea1b3da15a2e2fee1d08057&language=es'
        const request = await axios.get(patch)
        response = { success:true, message:'Detalle de la serie', data: request.data};
        return response
    } catch (error) {
        let response = { success:false, message:error.message };
        console.log(response)
        return response
    }
}
export const getSeries=  async (
    options = {
        requestType:'generic', 
        platform:null,
        genre:null,
        label:null,
        scroll:false, 
        setState:(e)=>console.log(e), 
        prevState:[],
        videoExist:null
    })=>
    {
    //firebase
    let response
    try { 
        if(options.platform.name != 'Ninguna'&&options.genre.name !='Ninguno'){
            options.requestType='platformAndGenres'
        }else if(options.platform.name != 'Ninguna'&&options.genre.name =='Ninguno'){
            options.requestType='platforms'
        }else if(options.platform.name == 'Ninguna'&&options.genre.name !='Ninguno'){
            options.requestType='genres'
        }else{options.requestType='generic'}

        const{
            requestType, 
            platform,
            genre,
            label,
            scroll, 
            setState, 
            prevState,
            videoExist,
        }= options

        if(requestType==='genres'&& !genre){
            response = { success:false, message:'Error de requestTypes en getSeries, faltan valores' };
            console.log(response)
            return response
        }else if(requestType==='platforms'&& !platform){
            response = { success:false, message:'Error de requestTypes en getSeries, faltan valores' };
            console.log(response)
            return response
        }else if(requestType==='genres'&& !genre){
            response = { success:false, message:'Error de requestTypes en getSeries, faltan valores' };
            console.log(response)
            return response
        }

        const selectedCollection = collection(db, `series_faces`);
        const video = (!videoExist?null:videoExist=='sin video'?"==":videoExist=='con video'?"!=":null)
        const requestTypes = !scroll&&video?{
            generic:async ()=> await getDocs(query(selectedCollection, orderBy("name",'asc'),where('firestore_url_video', video, ""),limit(24))),
            genres:async ()=> await getDocs(query(selectedCollection, orderBy("name",'asc'),where('genres', "array-contains", genre),where('firestore_url_video', video, ""),limit(24))),
            platforms:async ()=> await getDocs(query(selectedCollection, orderBy("name",'asc'),where('platform', "==", platform),where('firestore_url_video', video, ""),limit(24))),
            // labels:async ()=> await getDocs(query(selectedCollection, orderBy("name",'asc'),where('labels', "array-contains", label),where('firestore_url_video', video, ""),limit(24))),
            platformAndGenres: async ()=>  await getDocs(query(selectedCollection, orderBy("name",'asc'),where('platform', "==", platform),where('genres', "array-contains", genre),where('firestore_url_video', video, ""),limit(24))),
            // platformAndLabels: async ()=>  await getDocs(query(selectedCollection, orderBy("name",'asc'),where('plarform', "array-contains", platform),where('labels', "array-contains", label),where('firestore_url_video', video, ""),limit(24))),
            // genresAndLabels: async ()=>  await getDocs(query(selectedCollection, orderBy("name",'asc'),where('genres', "array-contains", genre),where('labels', "array-contains", label),where('firestore_url_video', video, ""),limit(24))),
        }:!scroll&&!video?{
            generic:async ()=> await getDocs(query(selectedCollection, orderBy("name",'asc'),limit(24))),
            genres:async ()=> await getDocs(query(selectedCollection, orderBy("name",'asc'),where('genres', "array-contains", genre),limit(24))),
            platforms:async ()=> await getDocs(query(selectedCollection, orderBy("name",'asc'),where('platform', "==", platform),limit(24))),
            // labels:async ()=> await getDocs(query(selectedCollection, orderBy("name",'asc'),where('labels', "array-contains", label),limit(24))),
            platformAndGenres: async ()=>  await getDocs(query(selectedCollection, orderBy("name",'asc'), where('platform', "==", platform ),where('genres', "array-contains", genre ),limit(24))),
            // platformAndLabels: async ()=>  await getDocs(query(selectedCollection, orderBy("name",'asc'),where('plarform', "array-contains", platform),where('labels', "array-contains",label),limit(24))),
            // genresAndLabels: async ()=>  await getDocs(query(selectedCollection, orderBy("name",'asc'),where('genres', "array-contains", genre),where('labels', "array-contains", label),limit(24))),
        }:scroll&&!video?{
            generic:async ()=> await getDocs(query(selectedCollection, orderBy("name",'asc'),startAfter(prevState[prevState.length-1].name),limit(12))),
            genres:async ()=> await getDocs(query(selectedCollection, orderBy("name",'asc'),where('genres', "array-contains", genre),startAfter(prevState[prevState.length-1].name),limit(21))),
            platforms:async ()=> await getDocs(query(selectedCollection, orderBy("name",'asc'),where('platform', "==", platform),startAfter(prevState[prevState.length-1].name),limit(21))),
            // labels:async ()=> await getDocs(query(selectedCollection, orderBy("name",'asc'),where('labels', "array-contains", label),startAfter(prevState[prevState.length-1].name),limit(21))),
            platformAndGenres: async ()=>  await getDocs(query(selectedCollection, orderBy("name",'asc'),where('platform', "==", platform),where('genres', "array-contains", genre),startAfter(prevState[prevState.length-1].name),limit(21))),
            // platformAndLabels: async ()=>  await getDocs(query(selectedCollection, orderBy("name",'asc'),where('plarform', "array-contains", platform),where('labels', "array-contains", label),startAfter(prevState[prevState.length-1].name),limit(21))),
            // genresAndLabels: async ()=>  await getDocs(query(selectedCollection, orderBy("name",'asc'),where('genres', "array-contains", genre),where('labels', "array-contains", label),startAfter(prevState[prevState.length-1].name),limit(21))),
        }:scroll&&video?{
            generic:async ()=> await getDocs(query(selectedCollection, orderBy("name",'asc'),where('firestore_url_video', video, ""),startAfter(prevState[prevState.length-1].name),limit(12))),
            genres:async ()=> await getDocs(query(selectedCollection, orderBy("name",'asc'),where('genres', "array-contains", genre),where('firestore_url_video', video, ""),startAfter(prevState[prevState.length-1].name),limit(21))),
            platforms:async ()=> await getDocs(query(selectedCollection, orderBy("name",'asc'),where('platform', "==", platform),where('firestore_url_video', video, ""),startAfter(prevState[prevState.length-1].name),limit(21))),
            // labels:async ()=> await getDocs(query(selectedCollection, orderBy("name",'asc'),where('labels', "array-contains", label),where('firestore_url_video', video, ""),startAfter(prevState[prevState.length-1].name),limit(21))),
            platformAndGenres: async ()=>  await getDocs(query(selectedCollection, orderBy("name",'asc'),where('platform', "==", platform),where('genres', "array-contains", genre),where('firestore_url_video', video, ""),startAfter(prevState[prevState.length-1].name),limit(21))),
            // platformAndLabels: async ()=>  await getDocs(query(selectedCollection, orderBy("name",'asc'),where('plarform', "array-contains", platform),where('labels', "array-contains", label),where('firestore_url_video', video, ""),startAfter(prevState[prevState.length-1].name),limit(21))),
            // genresAndLabels: async ()=>  await getDocs(query(selectedCollection, orderBy("name",'asc'),where('genres', "array-contains", genre),where('labels', "array-contains", label),where('firestore_url_video', video, ""),startAfter(prevState[prevState.length-1].name),limit(21))),
        }:null
        const requestSnapshot = await requestTypes[requestType]()
        const requestData = requestSnapshot.docs.map((movie) => ({
          ...movie.data(),   
          id: movie.id,
        }));
        response = { success:true, message:'Series obtenidas', data: [...prevState,...requestData]};
        return response
    } catch (error) {
        let response = { success:false, message:error.message };
        console.log(response)
        return response
    }
}

export const postSerie=  async (data)=>{
    //Firebase
    try { 
        let response = { success:false, message:'Reintente nuevamente en unos momentos' };
        const {id} = data
        data = {...data , updated_date:Timestamp.now(), created_date:Timestamp.now()}
        const selectedDoc = doc(db, `series/${id}`);
        const resolved = await setDoc(selectedDoc, data)
        response = { success:true, message:'Serie cargada a firebase', data: resolved};
        console.log(response)
        return response
    } catch (error) {
        let response = { success:false, message:error.message };
        console.log(response)
        return response
    }
}

export const DeleteSerie=  async (id)=>{
    //Firebase
    try { 
        let response = { success:false, message:'Reintente nuevamente en unos momentos' };
        const selectedDoc = doc(db, `series/${id}`);
        const resolved = await deleteDoc(selectedDoc)
        response = { success:true, message:'Serie eliminada de firebase', data: resolved};
        console.log(response)
        return response
    } catch (error) {
        let response = { success:false, message:error.message };
        console.log(response)
        return response
    }
}

