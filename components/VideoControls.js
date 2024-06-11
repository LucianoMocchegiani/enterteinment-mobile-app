import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';

const VideoControls = ({ isPlaying, onPlayPause, onRewind, onForward, size=24, onFullscreen, fullscreen, onPause, durationMillis, positionMillis, setPosition}) => {
  const iconColor='white'

  return (
    <>
      <View style={{width:'100%', flexDirection:'col', justifyContent:'center', alignItems: 'center',}}>
        <View style={{ flexDirection: 'col', justifyContent:'space-between', width:'95%'}}>
         <Text style={{ color:'white', }}>{(positionMillis? (positionMillis / 1000 )/60:0).toFixed(2)}/{(durationMillis? (durationMillis / 1000 )/60:0).toFixed(2)}</Text>
         <Slider
           style={styles.slider}
           minimumValue={0}
           maximumValue={durationMillis || 0}
           value={positionMillis || 0}
           onSlidingComplete={async value => {
             await setPosition(value);
           }}
           minimumTrackTintColor="#1EB1FC"
           maximumTrackTintColor="#8B9CB6"
           thumbTintColor="#1EB1FC"
         />
        </View>
        <View style={{ flexDirection: 'row', justifyContent:'space-between', width:'90%'}}>
          <TouchableOpacity style={styles.icon} onPress={() => onRewind(-10)}>
            <AntDesign name='banckward' size={size} color={iconColor}/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.icon} onPress={isPlaying?onPause:onPlayPause}>
            <AntDesign name={isPlaying ? 'pausecircle':'caretright'} size={size} color={iconColor}/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.icon} onPress={() => onForward(10)}>
            <AntDesign name='forward' size={size} color={iconColor}/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.icon} onPress={onFullscreen}>
            <MaterialIcons name={fullscreen?'fullscreen-exit':'fullscreen'} size={size+5} color={iconColor}/>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default VideoControls;

const styles = StyleSheet.create({
  icon:{
    flexDirection:'row'
  },
  slider:{
    width:'100%',
  }
})
