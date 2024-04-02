import React, {useState} from 'react'
import { StatusBar, Dimensions } from 'react-native'
import {ActivityIndicator, StyleSheet, View, Modal,Alert } from 'react-native';
import styled from 'styled-components/native'
import { useAuth } from '../context/authContext';
import { useStorage } from '../context/storageContext';

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
    background-color: #E7442E;
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
    color: white;
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
                <Overlay>                        
                    <FormWrapper>
                        <Form>
                            <AddText >Crear perfil</AddText >
                            <Input placeholder="Ingrese un nombre" placeholderTextColor='grey' value={name} onChangeText={(text) => setName(text)} />
                            <SubmitForm onPress={()=>handleSubmit({name:name, userStorage:userStorage})} ><ButtonText>Agregar perfil</ButtonText></SubmitForm>
                        </Form>
                    </FormWrapper>
                </Overlay>
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