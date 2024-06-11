import React from 'react'
import { ActivityIndicator, View } from 'react-native';
import { useStyles } from '../context/stylesContext'

const Loading = () => {
    const {height, width} = useStyles()
    return (
        <>
            <View 
                style={{
                    height:height*0.9, 
                    width:width,  
                    justifyContent: 'center',
                }}
            >
                <ActivityIndicator size={60} color={'white'}/>
            </View>
        </>
    )
}

export default Loading
