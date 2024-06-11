import React , { useState, useEffect }from 'react'
import { useStorage } from '../context/storageContext'
import Movies from './Movies'

const RecomendationMovies = ({label, platform})=>{
	const { finishied_movies } = useStorage()
    const [ genre, setGenre ] = useState(null)
    const [ movie, setMovie] = useState(null)
    useEffect(()=>{
        getRecomendationMovies()
    },[finishied_movies])
    const randonFinishiedMovie= ()=>{
        if(finishied_movies.length){
            let randomMovie = Math.floor(Math.random() * (finishied_movies.length-1));
            return  finishied_movies[randomMovie]
        }
    }
    const getRecomendationMovies= async ()=>{
        if(finishied_movies.length){
            const movie= randonFinishiedMovie()
            if(movie){
                const genre = movie.genres[Math.floor(Math.random() * movie.genres.length-1)]
                setMovie(movie)
                return setGenre(genre)
            }else{
                let response = { success:success, message:message, errorIn:'error en getRecomendationMovies'}
                console.log(response)
                return response
            }
        }else{
            return
        }
    }

	return (
        <>{finishied_movies.length&&genre?
            <Movies text={`Por ver ${movie?.title}`}  label={label} requestType = {'genres'} platform={platform} genre={genre} />
        :null}</>
	)
}

export default RecomendationMovies
