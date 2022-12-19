import {StyleSheet} from 'react-native';
import {ALMOST_BLACK, DARKBLUEBLACK} from './colors';

export const APPSTYLES = StyleSheet.create({
    title:{
        alignSelf:'center',
        color: ALMOST_BLACK,
        fontSize:24,
        fontWeight:'bold',
        height:40,
        textAlign:'center',
        textShadowColor:`${DARKBLUEBLACK}80`,
        textShadowOffset:{
            height:1,
            width:0.5
        },
        textShadowRadius:2
    }
});
