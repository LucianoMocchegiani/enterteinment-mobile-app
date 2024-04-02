import {createContext , useContext, useEffect, useState} from 'react';
import {signInWithPopup ,GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut} from 'firebase/auth';
import {auth} from '../firebase/firebase';

export const authContext = createContext();
export function useAuth (){
    const context = useContext(authContext)
    return context
}

export function AuthProvider({children}){
    const [user, setUser] = useState(null)
    
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
            return ({success:true , message:'Autentificacion exitosa'})
        }
        catch(error){
            return ({success:false, message: 'Error: '+error.message})
        }
    }
    const logout = async () => {
        try{
            await signOut(auth)
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
        onAuthStateChanged(auth, currentUser =>{
            setUser(currentUser)
        })
    },[])
    return (
        <authContext.Provider value={{signup, login, user, logout , loginWithGoogle }}>
            {children}
        </authContext.Provider>
    )
}


