import { doc , getDocs, addDoc, setDoc, Timestamp, collection} from 'firebase/firestore';
import { db } from '../firebase';

export const getHomeFrontPage=  async ()=>{
    try {
        let response = { success:false, message:'Reintente nuevamente en unos momentos' };
        const selectedCollection = collection(db, 'home_cover')
        const requestSnapshot = await getDocs( selectedCollection)
        const requestData = requestSnapshot.docs.map((movie) => ({
            ...movie.data(),   
            id: movie.id,
          }));
        response = { success:true, message:'Peliculas obtenidas', data:requestData};
        return response
    } catch (error) {
        let response = { errorIn:'getHomeFrontPage',success:false, message:error.message };
        console.log(response)
        return response
    }
}

export const getMoviesFrontPage=  async ()=>{
    try {
        let response = { success:false, message:'Reintente nuevamente en unos momentos' };
        const selectedCollection = collection(db, 'movies_cover')
        const requestSnapshot = await getDocs( selectedCollection)
        const requestData = requestSnapshot.docs.map((movie) => ({
            ...movie.data(),   
            id: movie.id,
          }));
        response = { success:true, message:'Peliculas obtenidas', data:requestData};
        return response
    } catch (error) {
        let response = { errorIn:'getMoviesFrontPage',success:false, message:error.message };
        console.log(response)
        return response
    }
}

export const getSeriesFrontPage=  async ()=>{
    try {
        let response = { success:false, message:'Reintente nuevamente en unos momentos' };
        const selectedCollection = collection(db, 'series_cover')
        const requestSnapshot = await getDocs( selectedCollection)
        const requestData = requestSnapshot.docs.map((movie) => ({
            ...movie.data(),   
            id: movie.id,
          }));
        response = { success:true, message:'Series obtenidas', data:requestData};
        return response
    } catch (error) {
        let response = { errorIn:'getSeriesFrontPage',success:false, message:error.message };
        console.log(response)
        return response
    }
}