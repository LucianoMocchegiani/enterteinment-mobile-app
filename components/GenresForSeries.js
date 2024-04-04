import React, { useState, useEffect, Suspense } from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import SelectComponent from './SelectForGenres'

const series = {
    data:[
        {
            "id": 10759,
            "name": "Action & Adventure"
        },
        {
            "id": 16,
            "name": "Animación"
        },
        {
            "id": 35,
            "name": "Comedia"
        },
        {
            "id": 80,
            "name": "Crimen"
        },
        {
            "id": 99,
            "name": "Documental"
        },
        {
            "id": 18,
            "name": "Drama"
        },
        {
            "id": 10751,
            "name": "Familia"
        },
        {
            "id": 10762,
            "name": "Kids"
        },
        {
            "id": 9648,
            "name": "Misterio"
        },
        {
            "id": 10763,
            "name": "News"
        },
        {
            "id": 10764,
            "name": "Reality"
        },
        {
            "id": 10765,
            "name": "Sci-Fi & Fantasy"
        },
        {
            "id": 10766,
            "name": "Soap"
        },
        {
            "id": 10767,
            "name": "Talk"
        },
        {
            "id": 10768,
            "name": "War & Politics"
        },
        {
            "id": 37,
            "name": "Western"
        }
    ],
    success:true,
    message: 'genres series',
}

const AwaitingGenres = ({selectGenre, setSelectGenre}) =>{
    const handleSelectGenre = (genre)=>{
        setSelectGenre(
            genre
        )
    }

    return(
        <SelectComponent
            text={'Generos'}
            objValue='name'
            objkey='id'
            arraySelects={[...series.data,{ id:'Ninguno', name:'Ninguno'}]}
            selectFunction={handleSelectGenre}
            selected={selectGenre?selectGenre:''}
        />
    )
}

const Genres = ({selectGenre, setSelectGenre}) =>{

    return(
        <Suspense fallback={<Text>Cargando...</Text>}>
            <AwaitingGenres selectGenre={selectGenre} setSelectGenre={setSelectGenre} />
        </Suspense>
    )
}
export default Genres;