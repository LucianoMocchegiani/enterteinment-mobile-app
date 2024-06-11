import React, { useState } from 'react'
import { ImageBackground } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import styled from 'styled-components/native'
import Header from '../components/Header'
import Hero from '../components/Hero'
import HeaderTabs from '../components/HeaderTabs';
import { getHomeFrontPage, getMoviesFrontPage, getSeriesFrontPage} from '../firebase/endpoints/frontPage'
import { useNavigation } from '@react-navigation/native'
import { useStyles } from '../context/stylesContext'
import Loading from './LoadingFrontPage'

const Gradient = styled(LinearGradient)`
	height: 101%;
`
const FrontPage = ({type='home'})=>{
    const {height, width} = useStyles()
    const [frontPage, setFrontPage] =useState(null)
    const navigation= useNavigation()
    const handleGetFrontPage = async ()=>{
        if(type==='home'){
            const {data, success}= await getHomeFrontPage()
            if(success && data.length){
                return setFrontPage(data[0])
            }
            return
        }else if(type==='movies'){
            const {data, success}= await getMoviesFrontPage()
            if(success && data.length){
                return setFrontPage(data[0])
            }
            return
        }else if(type==='series'){
            const {data, success}= await getSeriesFrontPage()
            if(success && data.length){
                return setFrontPage(data[0])
            }
            return
        }else{
            return
        }
		
	}
	handleGetFrontPage()
    return(
        <>
            <ImageBackground resizeMode='contain' style={{height:height*0.9, width:width}} source={{ uri: frontPage?.poster_path?"https://image.tmdb.org/t/p/w500"+frontPage.poster_path:null  }}>
                <Gradient
                    locations={[0.1, 0.2, 0.5, 0.94]}
                    colors={[
                        'rgba(0,0,0,0.5)',
                        'rgba(0,0,0,0.0)',
                        'rgba(0,0,0,0.0)',
                        'rgba(0,0,0,1)'
                    ]}>
                <Header login={true} navigation={navigation} />
                <HeaderTabs />
                {frontPage?
                <Hero movie={frontPage} type={type}/>:
                <Loading/>}
                </Gradient>
            </ImageBackground>
        </>
    )
}
export default FrontPage