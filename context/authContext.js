import {createContext , useContext, useEffect, useState} from 'react';
import {signInWithPopup ,GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, signInWithCustomToken, } from 'firebase/auth';
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
            await AsyncStorage.setItem('token', token);
        } catch (error) {
            console.error('Error al guardar el token:', error);
        }
    };

    const savePassword = async (password) => {
        try {
            await AsyncStorage.setItem('password', password);
        } catch (error) {
            console.error('Error al guardar el login:', error);
        }
    };

    const saveEmail = async (email) => {
        try {
            await AsyncStorage.setItem('email', email);
        } catch (error) {
            console.error('Error al guardar el login:', error);
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
            let response = await signInWithEmailAndPassword(auth, email, password)
            await saveEmail(email);
            await savePassword(password);
            return ({success:true , message:'Autentificacion exitosa'})
        }
        catch(error){
            return ({success:false, message: 'Error: '+error.message})
        }
    }
    const logout = async () => {
        try{
            await signOut(auth)
            await AsyncStorage.removeItem('token');
            await AsyncStorage.removeItem('email');
            await AsyncStorage.removeItem('password');
            setUser(null)
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
            if (currentUser) {
                setUser(currentUser);
                const userToken = await currentUser.getIdToken();
                await saveToken(userToken);
            } else {
                await AsyncStorage.removeItem('token');
                setUser(null);
            }
        });

    },[]);
    return (
        <authContext.Provider value={{signup, login, user, logout , loginWithGoogle }}>
            {children}
        </authContext.Provider>
    )
}


