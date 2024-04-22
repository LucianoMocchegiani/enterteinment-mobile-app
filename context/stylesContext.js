import {createContext , useContext, useEffect, useState} from 'react';
import { useOrientation } from '../orientation/UseOrientation';
import { Dimensions } from 'react-native'
const { width, height } = Dimensions.get("window")
export const stylesContext = createContext();
export function useStyles (){
    const context = useContext(stylesContext )
    return context
}

export function StylesProvider({children}){
    const [styles, setStyles] = useState({
        width:width, 
        heigh:height
    })
    const orientacion = useOrientation()
    useEffect(() => {
        const changeStyles= ()=>{
            const { width, height } = Dimensions.get("window")
            if(height<width){
                setStyles({
                    width: width,
                    height:width,
                })
            }else(
                setStyles({
                    width: width,
                    height: height,
                })
            )
           
        }
        changeStyles()
    },[orientacion])

    console.warn(styles)

    const { width, height } = styles
    return (
        <stylesContext.Provider value={{width, height}}>
            {children}
        </stylesContext.Provider>
    )
}


