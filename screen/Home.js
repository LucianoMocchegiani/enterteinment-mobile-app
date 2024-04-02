import React, { useEffect, useState, useLayoutEffect } from 'react'
import { StatusBar, Dimensions } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import styled from 'styled-components/native'
import Header from '../components/Header'
import Hero from '../components/Hero'
import Movies from '../components/Movies'
import HeaderTabs from '../components/HeaderTabs';
import {useAuth} from '../context/authContext'

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

const Home = ({ navigation }) => {

	const {user} = useAuth()
    const [platform, setPlatform]=useState({id:'ninguna',name:'ninguna'})
    const [genre, setGenre]=useState({id:'ninguna',name:'ninguna'})
    const [label, setLabel]=useState({id:'ninguna',name:'ninguna'})
    const [video, setVideo]=useState({id:'todas',name:'todas'})
	return (
		<>
			<StatusBar
				translucent
				backgroundColor='transparent'
				barStyle='light-content'
			/>
			<Container>
				<Poster source={{ uri: 'https://cdn.vox-cdn.com/thumbor/9PqzVk9RnfW0g22byhIyRSPDBYM=/1400x0/filters:no_upscale()/cdn.vox-cdn.com/uploads/chorus_asset/file/8832449/strangerthings.jpg' }}>
					<Gradient
						locations={[0, 0.2, 0.5, 0.94]}
						colors={[
							'rgba(0,0,0,0.5)',
							'rgba(0,0,0,0.0)',
							'rgba(0,0,0,0.0)',
							'rgba(0,0,0,1)'
						]}>
						<Header login={true} navigation={navigation} />
						<HeaderTabs />
						<Hero/>
					</Gradient>
				</Poster>
				<>
					<Movies text='Popular en Nigth' label={{id:'ninguna',name:'ninguna'}} requestType = {'generic'} platform={{id:'ninguna',name:'ninguna'}} genre={{id:'ninguna',name:'ninguna'}} />
					<Movies text='Top Movies' label={{id:'ninguna',name:'ninguna'}} requestType = {'generic'} platform={{id:'ninguna',name:'ninguna'}} genre={{id:'ninguna',name:'ninguna'}} />
					<Movies text='Top Series' label={{id:'ninguna',name:'ninguna'}} requestType = {'generic'} platform={{id:'ninguna',name:'ninguna'}} genre={{id:'ninguna',name:'ninguna'}} />
				</>
			</Container>
		</>
	)
}

export default Home
