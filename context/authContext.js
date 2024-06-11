import {createContext , useContext, useEffect, useState} from 'react';
import {signInWithPopup ,GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut} from 'firebase/auth';
import {auth} from '../firebase/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage'; 

export const authContext = createContext();
export function useAuth (){
    const context = useContext(authContext)
    return context
}

export function AuthProvider({children}){
    const [user, setUser] = useState(null)

    const saveToken = async (token) => {
        try {
            await AsyncStorage.setItem('userToken', token);
        } catch (error) {
            console.error('Error al guardar el token:', error);
        }
    };
    
    const signup = async (email , password ) => {
        try{
            await createUserWithEmailAndPassword(auth, email, password)
            return ({success:true , message:'Usuario creado'})
        }
        catch(error){
            return ({success:false, message: 'Error: '+error.message})
        }
    }
    const login = async (email, password ) =>{
        try{
            await signInWithEmailAndPassword(auth, email, password)
            const currentUser = auth.currentUser;
            const token = await currentUser.getIdToken();
            await saveToken(token);
            return ({success:true , message:'Autentificacion exitosa'})
        }
        catch(error){
            return ({success:false, message: 'Error: '+error.message})
        }
    }
    const logout = async () => {
        try{
            await signOut(auth)
            await AsyncStorage.removeItem('userToken');
            return ({success:true , message:'Sesion cerrada'})
        }
        catch(error){
            return ({success:false, message: 'Error: '+error.message})
        }
    }
    const loginWithGoogle =  () => {
        const googleProvider =  new GoogleAuthProvider()
        return signInWithPopup(auth, googleProvider)
    }
    useEffect(() => {
        onAuthStateChanged(auth, async currentUser =>{
            setUser(currentUser);
            if (currentUser) {
                const token = await currentUser.getIdToken();
                await saveToken(token);
            } else {
                await AsyncStorage.removeItem('userToken');
            }
        })
    },[])
    return (
        <authContext.Provider value={{signup, login, user, logout , loginWithGoogle }}>
            {children}
        </authContext.Provider>
    )
}


