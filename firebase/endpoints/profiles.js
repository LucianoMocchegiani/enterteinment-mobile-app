import { doc , getDoc, addDoc, setDoc, Timestamp, collection} from 'firebase/firestore';
import { db } from '../firebase';


const putUser = async (user, profile_id, profile_name, avatar)=>{
    try{
        data = { ...user, profiles:[...user.profiles.filter(e=>e.id !== profile_id), {id:profile_id, name:profile_name, avatar:avatar} ], updated_date:Timestamp.now()}
        const selectedDoc = doc(db, `users`);
        const resolved = await setDoc(selectedDoc, data)
        const response = {success: true, message:'Se actualizo el usuario', data:resolved}
        return response
    }catch(error){
        return error
    }
}

export const postProfile=  async (dataEntry)=>{
    try{
        let response = { success:false, message:'Reintente nuevamente en unos momentos' };
        const { name, userStorage} = dataEntry
        data = { account_id:userStorage.id, name:name, avatar:null, my_list_movies:[], my_list_series:[], finishied:[], whaching_now:[], updated_date:Timestamp.now(), created_date:Timestamp.now()}
        const selectedCollection = collection(db, `profiles`);
        const resolved = await addDoc(selectedCollection, data)
        const id = resolved._key.path.segments[1]
        const selectedDoc = doc(db, `users/${userStorage.id}`);
        const updatedData= {
            ...userStorage,
            profiles: [...userStorage.profiles, {id:id, name:name}]
        }
        const resolvedDoc = await setDoc(selectedDoc, updatedData)
        response = { success:true, message:'Perfil creado', data: resolved};
        return response
    }catch(error){
        let response = { success:false, message:error.message, };
        console.log(response)
        return response
    }
}

export const putProfile=  async (data)=>{
    try{
        let response = { success:false, message:'Reintente nuevamente en unos momentos' };
        const { name, email, id, my_list_movies, my_list_series, finishied, whaching_now} = data
        data = { account_id:email, name:name, my_list_movies:my_list_movies, my_list_series:my_list_series, finishied:finishied, whaching_now:whaching_now, updated_date:Timestamp.now() }
        const selectedDoc = doc(db, `profiles/${id}`);
        const resolved = await setDoc(selectedDoc, data)
        
        response = { success:true, message:'Perfil creado', data: resolved};
        return response
    }catch(error){
        let response = { success:false, message:error.message, };
        console.log(response)
        return response
    }
}

export const getProfile=  async (id)=>{
    try {
        let response = { success:false, message:'Reintente nuevamente en unos momentos' };
        const selectedDoc = doc(db, 'profiles/'+id)
        const requestSnapshot = await getDoc(selectedDoc)
        if (requestSnapshot.exists()){
            const salesData = { ...requestSnapshot.data(), id: requestSnapshot.id };
            response = { success:true, message:'Detalle del perfil', data: salesData};
        }else{
            response = { success:false, message:'No existe el perfil', data:null};
        }
        return response
    } catch (error) {
        let response = { success:false, message:error.message };
        console.log(response)
        return response
    }
}