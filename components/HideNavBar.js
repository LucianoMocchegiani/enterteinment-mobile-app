import { View, TouchableOpacity, StatusBar} from "react-native"
import * as NavigationBar from 'expo-navigation-bar';
import { useStyles } from "../context/stylesContext";
import { useEffect, useState } from "react";

const HideNavBar = ()=> {
    const {width, height}= useStyles()
    const handleHideFunction = async ()=>{
        const current = await NavigationBar.getVisibilityAsync()
        if (current == 'visible'){
            await NavigationBar.setVisibilityAsync('hidden')
            return
        }else{
            return
        }
    }

    return(
        <View style={{ position:'absolute',display:'flex', width:width, height:height*1.04 }}>
            <TouchableOpacity 
                style={{width:width, height:height*1.04}}
                onPress={()=>handleHideFunction()}>
            </TouchableOpacity>
        </View>
    )
}
export default HideNavBar