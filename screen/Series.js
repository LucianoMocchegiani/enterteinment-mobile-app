import React, { useState } from 'react'
import { StatusBar, Dimensions, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import styled from 'styled-components/native'
import Header from '../components/Header'
import Hero from '../components/Hero'
import Series from '../components/Series'
import { useNavigation } from '@react-navigation/native'
import Genres from '../components/GenresForSeries'
import Platforms from '../components/SelectPlatform'
import AllSeries from '../components/AllSeries'
import KeepWatchingSeries from '../components/KeepWatchingSeries'
const { height, width } = Dimensions.get('window')

const Container = styled.ScrollView`
	flex: 1;
	background-color: #000;
	min-height: ${height}px;
	height: auto;
`

const Poster = styled.ImageBackground`
	width: 100%;
	height: ${(height * 81) / 100}px;
`

const Gradient = styled(LinearGradient)`
	height: 101%;
`

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
			<Container>
                <Header login={true} goBack={navigation.goBack} label="Series" />
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
					<AllSeries selectGenre={selectGenre} selectPlatform={selectPlatform} selectLabel={selectLabel}/>
				</>:
				<>
					<KeepWatchingSeries/>
					<Series text='Drama' label={selectLabel} requestType = {'genres'} platform={selectPlatform} genre={{id:18,name:'Drama'}} />
					<Series text='Comedia' label={selectLabel} requestType = {'genres'} platform={selectPlatform} genre={{id:35,name:'Comedia'}} />
					{/* <Series text='Familia' label={selectLabel} requestType = {'genres'} platform={selectPlatform} genre={{id:10751,name:'Familia'}} /> */}
					<Series text='Sci-Fi & Fantasy' label={selectLabel} requestType = {'genres'} platform={selectPlatform} genre={{id:10765,name:'Sci-Fi & Fantasy'}} />
					<Series text='War & Politics' label={selectLabel} requestType = {'genres'} platform={selectPlatform} genre={{id:10768,name:'War & Politics'}} />
				</>
				}
			</Container>
		</>
	)
}

export default SeriesSection
