import React from 'react'
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

const  CheckMyList = ({movie}) => {
    const { setMyListMovies, my_list_movies} = useStorage()
    return(
        
        <Button
            activeOpacity={0.5} 
            onPress={() => {setMyListMovies(movie)}}>
            {my_list_movies.filter(e => e?.id === movie?.id).length?<Feather name="check" size={24} color="#fff" />
            :<Ionicons name="add-outline" size={28} color="#fff" />}
            <TextButton>My List</TextButton>
        </Button>
    )
}
export default CheckMyList