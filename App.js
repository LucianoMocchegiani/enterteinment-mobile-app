import React from 'react'
import {AuthProvider } from './context/authContext'
import { StorageProvider } from './context/storageContext'
import { StylesProvider } from './context/stylesContext'
import Home from './screen/Home'
import Login from './screen/Login'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import Register from './screen/Register';
import Splash from './screen/Splash';
import { KeyboardAvoidingView, Platform } from 'react-native';
import ViewMovie from './screen/ViewMovie';
import MyList from './screen/MyList';
import Movies from './screen/Movies';
import Series from './screen/Series';
import SearchScreen from './screen/SearchScreen';
import Profiles from './screen/Profiles'
import ViewEpisode from './screen/ViewEpisode'
import SerieDetail from './screen/SerieDetail'
import SeasonDetail from './screen/SeasonDetail'
import Reconect from './screen/Reconect'
import { LogBox } from 'react-native';
// LogBox.ignoreLogs(['Warning: ...']);
// LogBox.ignoreAllLogs();

const Stack = createStackNavigator();

const Navigation = () => {
  const screenOptions = {
    headerShown: false,
    ...TransitionPresets.SlideFromRightIOS,
  }

  return (
    <NavigationContainer>
      <AuthProvider>
      <StorageProvider>
      <StylesProvider>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1, }} keyboardVerticalOffset={Platform.OS === "ios" ? -64 : 0}>
        <Stack.Navigator initialRouteName="Reconect" screenOptions={screenOptions}>
          <Stack.Screen name="Login" component={Login} options={{
            gestureEnabled: true,
            animationEnabled: true,
            gestureDirection: "horizontal",
          }} />
          <Stack.Screen name="Register" component={Register} options={{
            gestureEnabled: true,
            animationEnabled: true,
            gestureDirection: "horizontal",
          }} />
          <Stack.Screen name="BottomStack" component={Home} />
          <Stack.Screen name="ViewMovie" component={ViewMovie} />
          <Stack.Screen name="ViewEpisode" component={ViewEpisode} />
          <Stack.Screen name="SerieDetail" component={SerieDetail} />
          <Stack.Screen name="SeasonDetail" component={SeasonDetail} />
          <Stack.Screen name="MyList" component={MyList} />
          <Stack.Screen name="Movies" component={Movies} />
          <Stack.Screen name="Series" component={Series} />
          <Stack.Screen name="Profiles" component={Profiles} />
          <Stack.Screen name="Search" component={SearchScreen} />
          <Stack.Screen name="Splash" component={Splash} />
          <Stack.Screen name="Reconect" component={Reconect} />
        </Stack.Navigator>
      </KeyboardAvoidingView>
      </StylesProvider>
      </StorageProvider>
      </AuthProvider>
    </NavigationContainer>
  )
}

export default Navigation

