import React, { useState, useEffect, Suspense } from 'react'
import { View, Text, StyleSheet, Dimensions, Platform } from 'react-native'
import SelectComponent from './SelectForGenres'

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
    const handleSelectPlatform = (platform)=>{
        setSelectPlatform(
            platform
        )
    }

    return(
        <SelectComponent
            text={'Plataformas'}
            objValue='name'
            objkey='id'
            arraySelects={[...platformsbd.data,{ id:'Ninguna', name:'Ninguna'}]}
            selectFunction={handleSelectPlatform}
            selected={selectPlatform?selectPlatform:''}
        />
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