import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import { getSerieDetail } from '../firebase/endpoints/series'
import { getEpisodeDetail } from '../firebase/endpoints/episodes'
import SelectComponent from '../components/Select'

const Episode = ({array, setSelect, select, episode, setEpisode, serie_id}) =>{
    const handleSelectEpisode = (e)=>{
        setSelect({
            ...select,
            episode: {
                episode_number: e.episode_number,
                name: e.name
            }
        })
    }
    const handleSetEpisode= async ()=>{
        const {success, message, data} = await getEpisodeDetail(serie_id, select.season.season_number, select.episode.episode_number)
        setEpisode({
            ...episode,
            success: success, 
            message: message,
            data: data
        })
    } 
    useEffect(()=>{
        handleSetEpisode()
    },[select.episode, select.season])

    return(
        <SelectComponent
            text={'Capitulo'}
            objValue='name'
            objkey='episode_number'
            arraySelects={array}
            selectFunction={handleSelectEpisode}
            selected={episode?.data?episode.data:''}
        />
    )
}

