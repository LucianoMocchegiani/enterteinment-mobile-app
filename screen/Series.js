import React, { useState} from 'react'
import { StatusBar, ScrollView} from 'react-native'
import Series from '../components/Series'
import { useNavigation } from '@react-navigation/native'
import AllSeries from '../components/AllSeries'
import KeepWatchingSeries from '../components/KeepWatchingSeries'
import FrontPage from '../components/FrontPage'
import Genres from '../components/GenresForSeries'
import Platforms from '../components/SelectPlatform'

const  SeriesSection = () => {
	
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
			<ScrollView style={{flex:1 , backgroundColor:'#000'}}>
				<FrontPage type={'series'}/>	
				<Genres selectGenre={selectGenre} setSelectGenre={setSelectGenre}/>
				<Platforms selectPlatform={selectPlatform} setSelectPlatform={setSelectPlatform}/>
				{ selectGenre.id !=='Ninguno'?
				<>
					<AllSeries selectGenre={selectGenre} selectPlatform={selectPlatform} selectLabel={selectLabel}/>
				</>:
				<>
					{/* <KeepWatchingSeries/> */}
					<Series text='Drama' label={selectLabel} requestType = {'genres'} platform={selectPlatform} genre={{id:18,name:'Drama'}} />
					<Series text='Comedia' label={selectLabel} requestType = {'genres'} platform={selectPlatform} genre={{id:35,name:'Comedia'}} />
					{/* <Series text='Familia' label={selectLabel} requestType = {'genres'} platform={selectPlatform} genre={{id:10751,name:'Familia'}} /> */}
					<Series text='Sci-Fi & Fantasy' label={selectLabel} requestType = {'genres'} platform={selectPlatform} genre={{id:10765,name:'Sci-Fi & Fantasy'}} />
					<Series text='War & Politics' label={selectLabel} requestType = {'genres'} platform={selectPlatform} genre={{id:10768,name:'War & Politics'}} />
				</>
				}
			</ScrollView>
		</>
	)
}

export default SeriesSection
