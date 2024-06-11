import React, { useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity, View, Text, Modal, SafeAreaView} from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Touchable = ( text, selected, onPress, objValue, objKey, icon, small)=>{
    const TouchableComponent = ()=>{
      return (
        <TouchableOpacity 
          onPress={onPress}
          style={small?styles.selectTouchSmall:styles.selectTouch}>
          {small? <Icon name={icon} color="#555" size={26}/>:
          <>
            <Text style={{...styles.text,width:'40%' }}>{text}</Text>
            <Icon name={icon} color="#555" size={26}/>
            <Icon name="chevron-right" color="#555" size={26}/>
            <Text style={{...styles.text,width:'50%'}}>{selected[objKey] +'-  '+ selected[objValue]}</Text>
          </>}
        </TouchableOpacity>
      )
    }
  return {TouchableComponent}
}
  const Option =(item, value , selected ,onPress, objKey) =>{
    const OptionComponent =()=>{
      return (
        <TouchableOpacity style={styles.selctedContainer} onPress={onPress}>
          <Text style={styles.selectText}>{item?item[objKey]+'-   '+item[value]:null}</Text>
        </TouchableOpacity>
      )
    }
    return {OptionComponent}
}
function Select (
    { 
      touchableComponent = Touchable,
      optionComponent=Option,
      touchableText = 'Select a option',  
      title ="",
      data=[],
      objKey ='id',
      objValue="name",
      selectFunction,
      selected,
      icon,
      small
    }
  ){
    const [visible,setVisible] = useState(false)
    const {TouchableComponent}=touchableComponent(touchableText,selected,()=> setVisible(true),objValue,objKey,icon, small);
    function renderOption(item){
      const {OptionComponent}=optionComponent(item,objValue,selected,()=>toggleSelect(item),objKey)
      return <OptionComponent key={item.id}/>
    }
    function toggleSelect(item){
      selectFunction(item)
      setVisible(false)
    }
    return(
      <>
       <TouchableComponent/>  
       <Modal visible={visible} animationType="slide">
         <SafeAreaView style={{flex:1}}>
           <View style={styles.cabeza}>
             <TouchableOpacity onPress={()=> setVisible(false)}>
             <Icon name="close" size={26} color={'#212121'}/>
             </TouchableOpacity>
             <View style={styles.tituloContenedor}>
               <Text style={styles.titulo}>{title}</Text>
             </View>
           </View>
           <FlatList  
            data={data}
            keyExtractor={(_,index) => String(index)}
            renderItem={({ item }) => renderOption(item)}
          />
         </SafeAreaView>
       </Modal>
       
      </>
    )
}

export default function ModalSelect({ text='Seleccionar', text2='', objValue='name', objkey='id', arraySelects, selectFunction, selected, icon=null, small=null}){
    return(
        <>
            <View style={small?styles.buttonSmall:styles.button}>
                <Select 
                  touchableText = {text2}
                  title="Selecciona una opcion" 
                  objKey={objkey}
                  objValue={objValue}
                  data={arraySelects} 
                  selectFunction={selectFunction}
                  touchableText={text}
                  selected={selected}
                  icon={icon}
                  small={small}
                />
            </View>
        </>
    )
}



const styles = StyleSheet.create({
    selectTouch:{
      flexDirection:'row',
      justifyContent: 'center',
      alignItems: 'center',
      width:'95%',
      height:'32px',
      backgroundColor:'fff',
      overflow:'hidden'
    },
    selectTouchSmall:{
      flexDirection:'row',
      justifyContent: 'center',
      alignItems: 'center',
      height: 'auto',
      width: 'auto',
      backgroundColor:'#fff',
      borderRadius:5,
      overflow:'hidden'
    },

    selectTextOne:{
      marginLeft:10,
      color:'#212121',
      fontSize:14,
      fontWeight:'800', 
    },

    selectText:{
      color:'#212121',
      fontSize:15,
      fontWeight:'600', 
    },

    cabeza:{
      borderBottomColor:'#eee',
      borderBottomWidth:3,
      flexDirection:"row-reverse",
      alignItems:"center",
      paddingBottom:12,
      paddingHorizontal:12,
    },

    tituloContenedor:{
      flex:1,
    },

    titulo:{
      marginLeft:'5%',
      fontSize:18,
      fontWeight: "bold",
      color:"#212121",
      textAlign:"center",
    },

    selctedContainer:{
      width:'100%',
      flexDirection:'row',
      alignItens: 'center',
      justifyContent: 'center',
      paddingHorizontal: 12,
      paddingVertical:12,
      borderBottomColor:'#eee',
      borderBottomWidth:10,
      backgroundColor:'#fff',
      overflow:'hidden'
    },

    container: {
      width:'90%',
      backgroundColor:'white',
      flexDirection:"row",
      alignItems:"center",
      marginTop:10,
    },

    title:{
      marginLeft:5,
      fontSize:14,
      fontWeight: "600",
      color:"#212121",
    },

    button:{
      width:'95%',
      height:'32px',
      backgroundColor:"#fff",
      borderColor:"#5c7ae3",
      borderRadius:2,
      paddingHorizontal:10,
      justifyContent:'center',
      alignItems:'center',
      flexDirection:'row',
      marginBottom:10,
    },

    buttonSmall:{
      width:'auto',
      height:'auto',
      justifyContent:'center',
      alignItems:'center',
      borderStartColor:'red'
    },


    text:{
      color: "black",
      fontWeight: "bold",
      textAlign: "center",
      fontSize:15,
      overflow:'hidden'
    },
});
 
 


