import { useEffect, useState, } from 'react';
import {addOrientationChangeListener, getOrientationAsync, Orientation, removeOrientationChangeListeners} from 'expo-screen-orientation'
import { ORIENTATION_NUMBER } from './orientation';

export const useOrientation = ()=>{
    const [screenOrientation, setScreenOrientation] = useState(Orientation.PORTRAIT_UP)

    useEffect(()=>{
        const onOrientationChange = (currentOrientation)=>{
            const orientationValue = currentOrientation.orientationInfo.orientation
            setScreenOrientation(orientationValue)
        }
        const initScreenOrientation = async ()=>{
            const currentOrientation = await getOrientationAsync()
            setScreenOrientation(currentOrientation)
        }
        initScreenOrientation()
        const screenOrientationListener= addOrientationChangeListener(onOrientationChange)

        return ()=>{
            removeOrientationChangeListeners(screenOrientationListener)
        }

    },[])
    return ORIENTATION_NUMBER[screenOrientation]
}
