import React, {useState} from 'react'
import { StatusBar, ScrollView} from 'react-native'
import Movies from '../components/Movies'
import { useNavigation } from '@react-navigation/native'
import Genres from '../components/GenresForMovies'
import Platforms from '../components/SelectPlatform'
import AllMovies from '../components/AllMovies'
import FrontPage from '../components/FrontPage'
import KeepWatchingMovies from '../components/KeepWatchingMovies'
import RecomendationMovies from '../components/RecommendationMovie'


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
			<ScrollView style={{flex:1 , backgroundColor:'#000'}} >
                <FrontPage type='movies'/>
				<Genres selectGenre={selectGenre} setSelectGenre={setSelectGenre}/>
				<Platforms selectPlatform={selectPlatform} setSelectPlatform={setSelectPlatform}/>
				{ selectGenre.id !=='Ninguno'?
				<>
					<AllMovies selectGenre={selectGenre} selectPlatform={selectPlatform} selectLabel={selectLabel}/>
				</>:
				<>
					<KeepWatchingMovies/>
					<RecomendationMovies label={selectLabel} platform={selectPlatform}/>
					<>
						<Movies text='Comedia' label={selectLabel} requestType = {'genres'} platform={selectPlatform} genre={{id: 35,name: "Comedia"}} />
						<Movies text='Familia' label={selectLabel} requestType = {'genres'} platform={selectPlatform} genre={{id:10751, name:'Familia'}} />
						<Movies text='Acción' label={selectLabel} requestType = {'genres'} platform={selectPlatform} genre={{id: 28,name: "Acción"}} />
						<Movies text='Ciencia ficción' label={selectLabel} requestType = {'genres'} platform={selectPlatform} genre={{id:878, name:'Ciencia ficción'}} />
						<Movies text='Romance' label={selectLabel} requestType = {'genres'} platform={selectPlatform} genre={{id:10749 ,name:'Romance'}} />
					</>
				</>
				}		
			</ScrollView >
		</>
	)
}

export default MoviesSection
