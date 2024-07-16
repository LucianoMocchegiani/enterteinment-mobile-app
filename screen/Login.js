import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import { ImageBackground, Alert, View, ScrollView } from 'react-native'
import styled from 'styled-components/native'
import Header from '../components/Header'
import { useAuth } from '../context/authContext';
import { useStorage } from '../context/storageContext';
import { useStyles } from '../context/stylesContext';


const SubmitForm = styled.TouchableOpacity`
    width: 95%;
    height: 50px;
    color: white;
    border-radius: 10px;
    border: none;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    background-color: #fff;
`

const Input = styled.TextInput`
    width: 95%;
    height: 50px;
    border: none;
    padding: 10px;
    border-radius: 15px;
    background-color: #333333;
    color: white;
    margin-top: 10px;
`

const ButtonText = styled.Text`
	font-size: 15px;
	font-weight: bold;
    padding-left: 5px;
    color: black;
`
const SignInText = styled.Text`
font-size: 30px;
font-weight: bold;
color: white;
margin: 10px;
text-align: left;
`

const NewToNetflixTextWrapper = styled.TouchableOpacity`
    width: 100%;
`

const NewToNetflix = styled.Text`
font-size: 15px;
font-weight: 500;
text-align: center;
color: #ccc;
margin: 15px;
text-align: center;
`

const Login = ({ navigation }) => {
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { height, width } = useStyles()
    const { login, } = useAuth()

    const handleLogin = async () => {
        if (!email || !password) {
            alert("Completa los campos!");
            setPassword("");
            setEmail("");
            return;
        }else{
            setLoading(true)
            const responce = await login(email, password)
            if(responce.success){
                setEmail('')
                setPassword('')
                setLoading(false)
                navigation.replace("Splash");
            }else{
                setEmail('')
                setPassword('')
                setLoading(false)
                Alert.alert('Error','Reintente ingresar nuevamente. '+responce.message)
            }

        }
    }

    return (
        <>
            <StatusBar style="light" />
            <ScrollView style={{backgroundColor:'#000', height:height}}>
                <ImageBackground source={{ uri: 'https://assets.nflxext.com/ffe/siteui/vlv3/9c5457b8-9ab0-4a04-9fc1-e608d5670f1a/710d74e0-7158-408e-8d9b-23c219dee5df/IN-en-20210719-popsignuptwoweeks-perspective_alpha_website_small.jpg' }} resizeMode="cover" style={{height:height}}>
                    <View style={{height:height}}>
                        <Header login={false} />
                        <View style={{width:width, justifyContent:'center', alignContent:'center', alignItems:'center', height:height*0.8}}>
                            <View style={{height:400, width:width*0.9, maxWidth:600,backgroundColor:'black',flexDirection:'column',borderRadius:20,padding:20,justifyContent:'center'}}>
                                <SignInText>Iniciar sesión</SignInText>
                                <Input placeholder="Ingrese su email" placeholderTextColor='grey' value={email} onChangeText={(text) => setEmail(text)} />
                                <Input placeholder="Contraseña" placeholderTextColor='grey' secureTextEntry value={password} onChangeText={(text) => setPassword(text)} />
                                <SubmitForm onPress={handleLogin} disabled={loading}><ButtonText>{loading ? "Cargando..." : "Entrar"}</ButtonText></SubmitForm>
                                <NewToNetflixTextWrapper activeOpacity={0.5} onPress={() => navigation.navigate("Register")}><NewToNetflix>No tienes cuenta? Crea tu cuenta</NewToNetflix></NewToNetflixTextWrapper>
                            </View>
                        </View>
                    </View>
                </ImageBackground>
            </ScrollView>
        </>
    )
}

export default Login
