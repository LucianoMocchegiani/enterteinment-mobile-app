import React , { useState, useEffect }from 'react'
import { useStorage } from '../context/storageContext'
import { getSerieDetail } from '../firebase/endpoints/series'
import Series from './Series'

const RecomendationSeries = ({label, platform})=>{
	const { finishied_series } = useStorage()
    const [ genre, setGenre ] = useState(null)
    const [ serie, setSerie ] = useState(null)
    useEffect(()=>{
        getRecomendationSeries()
    },[finishied_series])
    const randonFinishiedSerie = ()=>{
        if(finishied_series.length){
            let randomSerie = Math.floor(Math.random() * (finishied_series.length-1));
            return  finishied_series[randomSerie]
        }
    }
    const getRecomendationSeries= async ()=>{
        if(finishied_series.length){
            const serie= randonFinishiedSerie()
            const serieId= serie.serie_id
            const {data, success, message} = await getSerieDetail(serieId)
            if(success && data){
                const genre = data?.genres[Math.floor(Math.random() * data?.genres.length-1)]
                setSerie(data)
                return setGenre(genre)
            }else{
                let response = { success:success, message:message, errorIn:'error en getRecomendationSeries'}
                console.log(response)
                return response
            }
        }else{
            return
        }
    }

	return (
        <>{finishied_series.length&&genre?
            <Series text={`Por ver ${serie?.name}`} label={label} requestType = {'genres'} platform={platform} genre={genre} />
        :null}</>
	)
}

export default RecomendationSeries
