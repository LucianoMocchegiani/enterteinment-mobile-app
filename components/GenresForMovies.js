import React, { useState, useEffect, Suspense } from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import SelectComponent from './SelectForGenres'
import { useStyles } from '../context/stylesContext'

const movies = {
    data:[
        {
        "id": 28,
        "name": "Acción"
        },
        {
        "id": 12,
        "name": "Aventura"
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
        "id": 14,
        "name": "Fantasía"
        },
        {
        "id": 36,
        "name": "Historia"
        },
        {
        "id": 27,
        "name": "Terror"
        },
        {
        "id": 10402,
        "name": "Música"
        },
        {
        "id": 9648,
        "name": "Misterio"
        },
        {
        "id": 10749,
        "name": "Romance"
        },
        {
        "id": 878,
        "name": "Ciencia ficción"
        },
        {
        "id": 10770,
        "name": "Película de TV"
        },
        {
        "id": 53,
        "name": "Suspense"
        },
        {
        "id": 10752,
        "name": "Bélica"
        },
        {
        "id": 37,
        "name": "Western"
        }
    ],
    success:true,
    message: 'genres movies',
}
const AwaitingGenres = ({selectGenre, setSelectGenre}) =>{
    const { heigth, width } = useStyles()
    const handleSelectGenre = (genre)=>{
        setSelectGenre(
            genre
        )
    }

    return(
        <View style={{width:width, alignItems:'center', marginTop:30}}>
            <SelectComponent
                text={'Generos'}
                objValue='name'
                objkey='id'
                arraySelects={[...movies.data,{ id:'Ninguno', name:'Ninguno'}]}
                selectFunction={handleSelectGenre}
                selected={selectGenre?selectGenre:''}
            />
        </View>
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