import React from 'react'
import { ActivityIndicator, View, FlatList} from 'react-native';
import { useStyles } from '../context/stylesContext'

const Loading = () => {
    const {height, width} = useStyles()
    const render = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24]
    return (
        <>
            <FlatList
                horizontal 
                data={render}
                keyExtractor={(e, index)=> e + index}
                renderItem ={({ item:e})=>(
                    <View style={{paddingHorizontal:5}}>
                        <View
                            style={{
                                width: width * 0.35,
                                height: width * 0.55,
                                maxWidth: 200,
                                maxHeight: 350,
                                borderColor:'white',
                                borderWidth:1,
                                justifyContent: 'center',
                            }}
                        >
                            <ActivityIndicator size={40} color={'white'}/>
                        </View>
                    </View>
                )}
            />
        </>
    )
}

export default Loading
