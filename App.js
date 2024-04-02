import React from 'react'
import {AuthProvider } from './context/authContext'
import { StorageProvider } from './context/storageContext'
import Home from './screen/Home'
import Login from './screen/Login'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
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
import { LogBox } from 'react-native';
// LogBox.ignoreLogs(['Warning: ...']);
// LogBox.ignoreAllLogs();

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const Navigation = () => {
  function BottomStackScreen() {
    return (
      <Tab.Navigator 
        screenOptions={{
          tabBarActiveTintColor: 'white',
          tabBarInactiveTintColor: '#5B5B5B',
          tabBarLabelStyle: {
            fontSize: 14,
          },
          tabBarItemStyle: {
            flexDirection: 'row',
          },
          tabBarStyle: {
            backgroundColor: '#141414',
            borderTopWidth: 0,
            elevation: 0, // for Android
            shadowOffset: {
              width: 0,
              height: 0, // for iOS
            },
            height: 60,
            paddingBottom: 10,
          },
          headerShown:false,
        }}  
      >
        <Tab.Screen name="Home" component={Home} options={{
          tabBarIcon: ({ color }) => <AntDesign name="home" size={24} color={color} style={{ marginBottom: 10 }} />
        }} />
        <Tab.Screen name="Movies" component={Movies} options={{
          tabBarIcon: ({ color }) => <MaterialIcons name="video-library" size={24} color={color} style={{ marginBottom: 10 }} />
        }} />
         <Tab.Screen name="Series" component={Series} options={{
          tabBarIcon: ({ color }) => <MaterialIcons name="video-library" size={24} color={color} style={{ marginBottom: 10 }} />
        }} />
      </Tab.Navigator>
    );
  }

  const screenOptions = {
    headerShown: false,
    ...TransitionPresets.SlideFromRightIOS,
  }

  return (
    <NavigationContainer>
      <AuthProvider>
      <StorageProvider>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1, }} keyboardVerticalOffset={Platform.OS === "ios" ? -64 : 0}>
        <Stack.Navigator initialRouteName="Splash" screenOptions={screenOptions}>
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
        </Stack.Navigator>
      </KeyboardAvoidingView>
      </StorageProvider>
      </AuthProvider>
    </NavigationContainer>
  )
}

export default Navigation
