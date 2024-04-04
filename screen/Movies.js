import React, {useState} from 'react'
import { StatusBar, Dimensions, View} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import styled from 'styled-components/native'
import Header from '../components/Header'
import Hero from '../components/Hero'
import Movies from '../components/Movies'
import { useNavigation } from '@react-navigation/native'
import Genres from '../components/GenresForMovies'
import Platforms from '../components/SelectPlatform'
import AllMovies from '../components/AllMovies'
import KeepWatchingMovies from '../components/KeepWatchingMovies'
const { height, width } = Dimensions.get('window')
const Container = styled.ScrollView`
	flex: 1;
	background-color: #000;
	min-height: ${(Dimensions.get('window').height)}px;
	height: auto;
`

const Poster = styled.ImageBackground`
	width: 100%;
	height: ${(Dimensions.get('window').height * 81) / 100}px;
`

const Gradient = styled(LinearGradient)`
	height: 101%;
`

const MoviesSection = () => {

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
	const navigation = useNavigation();

	return (
		<>
			<StatusBar
				translucent
				backgroundColor='transparent'
				barStyle='light-content'
			/>
			<Container>
                <Header login={true} goBack={navigation.goBack} label="Peliculas" />
				<Poster source={{ uri: 'https://cdn.vox-cdn.com/thumbor/9PqzVk9RnfW0g22byhIyRSPDBYM=/1400x0/filters:no_upscale()/cdn.vox-cdn.com/uploads/chorus_asset/file/8832449/strangerthings.jpg' }}>
					<Gradient
						locations={[0, 0.2, 0.5, 0.94]}
						colors={[
							'rgba(0,0,0,0.5)',
							'rgba(0,0,0,0.0)',
							'rgba(0,0,0,0.0)',
							'rgba(0,0,0,1)'
						]}>
						<View style={{width:width, alignItems:'center', paddingTop:20}}>
							<Genres  selectGenre={selectGenre} setSelectGenre={setSelectGenre}/>
							<Platforms selectPlatform={selectPlatform} setSelectPlatform={setSelectPlatform}/>
						</View>
						{/* <Header login={true} navigation={navigation} /> */}
						<Hero/>
					</Gradient>
				</Poster>
				{ selectGenre.id !=='Ninguno'?
				<>
					<AllMovies selectGenre={selectGenre} selectPlatform={selectPlatform} selectLabel={selectLabel}/>
				</>:

				<>
					<KeepWatchingMovies/>
					<Movies text='Comedia' label={selectLabel} requestType = {'genres'} platform={selectPlatform} genre={{id: 35,name: "Comedia"}} />
					<Movies text='Familia' label={selectLabel} requestType = {'genres'} platform={selectPlatform} genre={{id:10751, name:'Familia'}} />
					<Movies text='Acción' label={selectLabel} requestType = {'genres'} platform={selectPlatform} genre={{id: 28,name: "Acción"}} />
					<Movies text='Ciencia ficción' label={selectLabel} requestType = {'genres'} platform={selectPlatform} genre={{id:878, name:'Ciencia ficción'}} />
					<Movies text='Romance' label={selectLabel} requestType = {'genres'} platform={selectPlatform} genre={{id:10749 ,name:'Romance'}} />
				</>
				}		
			</Container>
		</>
	)
}

export default MoviesSection
