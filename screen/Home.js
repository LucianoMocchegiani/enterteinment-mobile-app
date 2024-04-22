import React, { useState, Suspense } from 'react'
import { StatusBar, Text, ScrollView } from 'react-native'
import Movies from '../components/Movies'
import Series from '../components/Series'
import FrontPage from '../components/FrontPage'

const Home = () => {
	const [selectPlatform, setSelectPlatform] = useState({
        id:'Ninguna',
        name:'Ninguna'
    })
	const [selectGenre, setSelectGenre] = useState({
        id:'Ninguno',
        name:'Ninguno'
    })
	const [selectLabel, setSelectLabel] = useState({
        id:'Ninguna',
        name:'Ninguna'
    })
	
	return (
		<>
			<StatusBar
				translucent
				backgroundColor='transparent'
				barStyle='light-content'
			/>
			<ScrollView style={{flex:1 , backgroundColor:'#000'}} >
				<Suspense fallback={<Text>cargando...</Text>}>
					<FrontPage type='home'/>	
				</Suspense>
				<>
					<Series text='Top series' label={selectLabel} requestType = {'genres'} platform={selectPlatform} genre={{id:'Ninguno',name:'Ninguno'}} />
					<Movies text='Top peliculas' label={selectLabel} requestType = {'genres'} platform={selectPlatform} genre={{id: 'Ninguno',name: 'Ninguno'}} />
				</>
			</ScrollView>
		</>
	)
}

export default Home
