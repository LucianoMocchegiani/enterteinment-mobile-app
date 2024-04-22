import React, { Suspense } from 'react'
import { View, Text } from 'react-native'
import SelectComponent from './SelectForGenres'
import { useStyles } from '../context/stylesContext'

const platformsbd = {
    data:[
        {
            "id": 1,
            "name": "Disney +"
        },
        {
            "id": 2,
            "name": "Start +"
        },
        {
            "id": 'Netflix',
            "name": 'Netflix'
        },
        {
            "id": 4,
            "name": "Amazon Prime"
        },
        {
            "id": 99,
            "name": "Hbo Max"
        }, 
    ],
    success:true,
    message: 'all platforms',
}

const AwaitingPlatform = ({selectPlatform, setSelectPlatform}) =>{
    const { heigth, width } = useStyles()
    const handleSelectPlatform = (platform)=>{
        setSelectPlatform(
            platform
        )
    }

    return(
        <View style={{width:width, paddingVertical:10, alignItems:'center'}}>
            <SelectComponent
                text={'Plataformas'}
                objValue='name'
                objkey='id'
                arraySelects={[...platformsbd.data,{ id:'Ninguna', name:'Ninguna'}]}
                selectFunction={handleSelectPlatform}
                selected={selectPlatform?selectPlatform:''}
            />
        </View>
    )
}

const Platforms = ({selectPlatform, setSelectPlatform}) =>{

    return(
        <Suspense fallback={<Text>Cargando...</Text>}>
            <AwaitingPlatform selectPlatform={selectPlatform} setSelectPlatform={setSelectPlatform}/>
        </Suspense>
    )
}
export default Platforms;