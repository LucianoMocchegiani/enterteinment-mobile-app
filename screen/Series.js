import React, {useState} from 'react'
import { StatusBar, Dimensions } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import styled from 'styled-components/native'
import Header from '../components/Header'
import Hero from '../components/Hero'
import Movies from '../components/Series'
import {useAuth} from '../context/authContext'
import { useNavigation } from '@react-navigation/native'
import SelectComponent from '../components/Select'

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

const  SeriesSection = () => {

	const {user} = useAuth()
	const [movies, setMovies] = useState([]);
    const [platform, setPlatform]=useState({id:'ninguna',name:'ninguna'})
    const [genre, setGenre]=useState({id:'ninguna',name:'ninguna'})
    const [label, setLabel]=useState({id:'ninguna',name:'ninguna'})
    const [video, setVideo]=useState({id:'todas',name:'todas'})
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
						{/* <Header login={true} navigation={navigation} /> */}
						<Hero/>
					</Gradient>
				</Poster>
				
				<>
					{/* <Movies text='Lo mas visto' label={{id:'ninguna',name:'ninguna'}} requestType = {'generic'} platform={{id:'ninguna',name:'ninguna'}} genre={{id:'ninguna',name:'ninguna'}} />
					<Movies text='Clasicos' label={{id:'ninguna',name:'ninguna'}} requestType = {'generic'} platform={{id:'ninguna',name:'ninguna'}} genre={{id:'ninguna',name:'ninguna'}} /> */}
					<Movies text='Romance' label={{id:'ninguna',name:'ninguna'}} requestType = {'genres'} platform={{id:'ninguna',name:'ninguna'}} genre={{id:10749,name:'Romance'}} />
					<Movies text='Comedia' label={{id:'ninguna',name:'ninguna'}} requestType = {'genres'} platform={{id:'ninguna',name:'ninguna'}} genre={{id:35,name:'Comedia'}} />
					<Movies text='Familia' label={{id:'ninguna',name:'ninguna'}} requestType = {'genres'} platform={{id:'ninguna',name:'ninguna'}} genre={{id:10751,name:'Familia'}} />
					<Movies text='Acción' label={{id:'ninguna',name:'ninguna'}} requestType = {'genres'} platform={{id:'ninguna',name:'ninguna'}} genre={{id:28,name:'Acción'}} />
					<Movies text='Ciencia ficción' label={{id:'ninguna',name:'ninguna'}} requestType = {'genres'} platform={{id:'ninguna',name:'ninguna'}} genre={{id:878,name:'Ciencia ficción'}} />
				</>
			</Container>
		</>
	)
}

export default SeriesSection
