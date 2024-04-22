import React, { useEffect, useState } from 'react'
import styled from 'styled-components/native'
import { useNavigation } from '@react-navigation/native'
import { Feather } from '@expo/vector-icons'

const Container = styled.View`
	position: absolute;
	width: 100%;
	align-items: center;
	bottom: 8px;
`

const Tags = styled.View`
	justify-content: center;
	margin-top: 20px;
	flex-direction: row;
	align-items: center;
`

const MenuTag = styled.Text`
	color: #fff;
	padding: 0 8px;
	font-size: 13px;
`

const Separator = styled.View`
	width: 3px;
	height: 3px;
	background-color: #e8e8e8;
	margin: 6px 0;
	border-radius: 3px;
`

const MenuHero = styled.View`
	width: 90%;
	margin-top: 15px;
	flex-direction: row;
	justify-content: center;
	align-items: center;
`

const Play = styled.TouchableOpacity`
	flex-direction: row;
	background-color: #fff;
	width: 142px;
	height: 32px;
	border-radius: 2px;
	align-items: center;
	justify-content: center;
`

const TextButtonPlay = styled.Text`
	font-size: 15px;
	font-weight: bold;
	padding-left: 5px;
`

const Hero = ({ movie, type}) => {
	const navigation = useNavigation();
	return (
		<Container>
			  <Tags>
                    {
                        movie?.genres?.map((genre, i) => {
                            return (
								<>
									<MenuTag key={genre.id}>{genre.name}</MenuTag>
									{(i+1)!=movie?.genres?.length?<Separator key={i}/>:null}
								</>
                            )
                        })
                    }
                </Tags>
			<MenuHero>
				{movie&&
				<Play activeOpacity={0.5} onPress={() => {
					if(type && type==='series'){
						navigation.navigate("ViewEpisode", {
							id: movie.id
						})
					}else{navigation.navigate("ViewMovie", {
						id: movie.id
						})
					}
				}}>
					<Feather name='play' size={22} color='black' />
					<TextButtonPlay>Play</TextButtonPlay>
				</Play>}
			</MenuHero>
		</Container>
	)
}

export default Hero
