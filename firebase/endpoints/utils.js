import { doc , getDoc} from 'firebase/firestore';
import { db, } from '../firebase';

export const getNumberPhone =  async (id)=>{
    //Firebase
    try {
        let response = { success:false, message:'Reintente nuevamente en unos momentos' };
        const selectedDoc = doc(db, 'utils/number_phone')
        const requestSnapshot = await getDoc(selectedDoc)
        if (requestSnapshot.exists()){
            const movieData = { ...requestSnapshot.data()};
            response = { success:true, message:'numero obtenido', data: movieData};
        }else{
            response = { success:false, message:'no existe ningun numero', data:null};
        }
        return response
    } catch (error) {
        let response = { success:false, message:error.message };
        console.log(response)
        return response
    }
}