import React, {useState} from 'react'
import {StyleSheet, Modal, Alert, ScrollView, View, StatusBar} from 'react-native';
import styled from 'styled-components/native'
import { useStorage } from '../context/storageContext';
import { useStyles } from '../context/stylesContext';
const FormWrapper = styled.View`
    width: 100%;
    justifyContent: center;
    alignItems: center;
    height: 80%;
`

const Form = styled.View`
height: 400px;
    width: 90%;
    background-color: black;
    flex-direction: column;
    border-radius: 20px;
    padding: 20px;
    justify-content: center;
`

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

const Overlay = styled.View`
    background-color: 'rgba(0,0,0,0.5)';
    flex: 1;
`
const AddText = styled.Text`
font-size: 30px;
font-weight: bold;
color: white;
margin: 10px;
text-align: left;
`


const Add = ({visible=true, submit=()=>{}}) => {
    const [name, setName] = useState('');
    const {userStorage} = useStorage()
    const  {height, width} = useStyles()
    const handleSubmit = (data)=>{
        if(name){
            submit(data)
        }
        else{
            Alert.alert('Error','Ingrese un nombre.')
        }
    }
    return (
        <>
            <Modal visible={visible} animationType="slide">
                <StatusBar style="light" />
                <ScrollView style={{backgroundColor:'#000', height:height}}>                       
                <View style={{width:width, justifyContent:'center', alignContent:'center', alignItems:'center', height:height*0.8}}>
                <View style={{height:400, width:width*0.9, maxWidth:600,backgroundColor:'black',flexDirection:'column',borderRadius:20,padding:20,justifyContent:'center'}}>
                            <AddText >Crear perfil</AddText >
                            <Input placeholder="Ingrese un nombre" placeholderTextColor='grey' value={name} onChangeText={(text) => setName(text)} />
                            <SubmitForm onPress={()=>handleSubmit({name:name, userStorage:userStorage})} ><ButtonText>Agregar perfil</ButtonText></SubmitForm>
                        </View>
                    </View>
                </ScrollView>
            </Modal>
        </>
    )
}

export default Add
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
    },
    horizontal: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      padding: 10,
    },
  });