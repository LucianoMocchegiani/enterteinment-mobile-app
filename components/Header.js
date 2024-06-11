import React from 'react'
import styled from 'styled-components/native'
import { AntDesign, MaterialIcons, FontAwesome, } from '@expo/vector-icons';
import { TouchableOpacity, View, Linking  } from 'react-native';
import {
	useFonts,
	Montserrat_200ExtraLight,
	Montserrat_300Light,
	Montserrat_400Regular,
	Montserrat_500Medium,
	Montserrat_700Bold,
	Montserrat_800ExtraBold
} from "@expo-google-fonts/montserrat";
import { Link, useNavigation } from '@react-navigation/native';

const Container = styled.View`
	align-items: center;
	flex-direction: row;
	justify-content: space-between;
	padding: 40px 25px 0 25px;
	width: 100%;
	
`

const Container2 = styled.View`
	align-items: center;
	flex-direction: row;
	justify-content: space-between;
	padding: 40px 25px 0 25px;
	width: 100%;
`

const Logo2 = styled.Image`
	width: 125px;
	height: 145px;
`

const Avatar = styled.Image`
width: 50px;
height: 35px;
border-radius: 20px;
`

const Avatar2 = styled.Image`
width: 40px;
height: 30px;
border-radius: 20px;
`

const HeaderIcons = styled.View`
	flex-direction: row;
	justify-content: center;
	align-items: center;
`

const HeaderTitle = styled.Text`
	color: white;
	margin-left: 15px;
	font-family: "Montserrat_400Regular";
	font-size: 18px;
`

const HeaderLeftSide = styled.View`
	flex-direction: row;
`

const Header = ({ login, goBack, label }) => {
	const navigation = useNavigation();
	let [fontsLoaded] = useFonts({
		Montserrat_200ExtraLight,
		Montserrat_300Light,
		Montserrat_400Regular,
		Montserrat_500Medium,
		Montserrat_700Bold,
		Montserrat_800ExtraBold
	});
	const openURL = (url) => {
		Linking.openURL(url).catch((err) => console.error("Couldn't load page", err));
	  };

	return fontsLoaded && (
		login ? (
			<Container>
				<HeaderLeftSide>
					{
						goBack ? (
							<TouchableOpacity
								style={{ marginLeft: 10 }}
								onPress={goBack}
							>
								<AntDesign name="arrowleft" size={24} color="white" />
							</TouchableOpacity>
						) : (
								<>
									<View style={{width:36, height:36, borderRadius:36, backgroundColor:'#fff', justifyContent:'center', alignContent:'center', alignItems:'center'}}><FontAwesome style={{marginLeft:5}}name='play' size={22} color='black' /></View>
									<TouchableOpacity style={{marginLeft:20}}onPress={()=>openURL('https://wa.me/15551234567')}><View style={{width:36, height:36, borderRadius:36, backgroundColor:'#fff', justifyContent:'center', alignContent:'center', alignItems:'center', backgroundColor:'#25D366'}}><FontAwesome name='whatsapp' size={22} color='white' /></View></TouchableOpacity>
								</>
							)
					}
					{
						label && (
							<HeaderTitle>{label}</HeaderTitle>
						)
					}
				</HeaderLeftSide>
				<HeaderIcons>
					{
						goBack ? (
							<TouchableOpacity activeOpacity={0.5} onPress={() => {
								navigation.navigate("Search")
							}}>
								<MaterialIcons name="search" size={30} color="white" style={{ marginRight: 15 }} />
							</TouchableOpacity>
						) : (
								<TouchableOpacity activeOpacity={0.5} onPress={() => {
									navigation.navigate("Search")
								}}>
									<MaterialIcons name="search" size={35} color="white" style={{ marginRight: 15 }} />
								</TouchableOpacity>
							)
					}
					{
						goBack ? (
							<TouchableOpacity activeOpacity={0.5} onPress={() => {navigation.navigate("Profiles")}}>
								<Avatar2 resizeMode='contain' source={{ uri: 'https://occ-0-4857-2164.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABTYctxxbe-UkKEdlMxXm4FVGD6DqTHkQ0TQ5CQJ9jbOMnG0CYxYcSICcTUQz8DrB7CpKUGpqJVMtEqksLlvSJx2ac3Ak.png?r=a41' }} />
							</TouchableOpacity>
						) : (
								<TouchableOpacity activeOpacity={0.5} onPress={() => {navigation.navigate("Profiles")}}>
									<Avatar resizeMode='contain' source={{ uri: 'https://occ-0-4857-2164.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABTYctxxbe-UkKEdlMxXm4FVGD6DqTHkQ0TQ5CQJ9jbOMnG0CYxYcSICcTUQz8DrB7CpKUGpqJVMtEqksLlvSJx2ac3Ak.png?r=a41' }} />
								</TouchableOpacity>
							)
					}
				</HeaderIcons>
			</Container>
		) : (
				<Container2>
					<View style={{width:36, height:36, borderRadius:36, backgroundColor:'#fff', justifyContent:'center', alignContent:'center', alignItems:'center'}}><FontAwesome style={{marginLeft:5}}name='play' size={22} color='black' /></View>
				</Container2>
			)
	)

}

export default Header
