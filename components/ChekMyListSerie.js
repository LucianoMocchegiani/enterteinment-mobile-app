import React, { useState, useEffect } from 'react'
import styled from 'styled-components/native'
import { Ionicons, Feather } from '@expo/vector-icons'
import { useStorage } from '../context/storageContext'

const Button = styled.TouchableOpacity`
	align-items: center;
    padding: 10px;
    flex-direction: row;
`

const TextButton = styled.Text`
	color: #fff;
	font-size: 13px;
	margin-top: 3px;
`

const  CheckMyList = ({serie}) => {
    const { setMyListSeries, my_list_series} = useStorage()

    return(
        
        <Button
            activeOpacity={0.5} 
            onPress={() => {setMyListSeries(serie)}}>
            {my_list_series.filter(e => e?.id === serie?.id).length?<Feather name="check" size={24} color="#fff" />
            :<Ionicons name="add-outline" size={28} color="#fff" />}
            <TextButton>My List</TextButton>
        </Button>
    )
}
export default CheckMyList