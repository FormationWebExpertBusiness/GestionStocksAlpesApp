import {StyleSheet} from 'react-native';
import {ALMOST_BLACK, ALMOST_WHITE, DARKBLUEBLACK, MAGNIFYINGLASSBG, REDBACKGROUND, VERY_LIGHT_GREY, VERY_VERY_LIGHT_GREY, WHITE} from './colors';

export const TABLESTYLES = StyleSheet.create({
    wrapper: {
        marginTop: 20,
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5,
        shadowColor: DARKBLUEBLACK,
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowOpacity:  0.16,
        shadowRadius: 1.51,
        elevation: 2
    }
});

export const LINESTYLES = StyleSheet.create({
    wrapper: {
        paddingHorizontal: 10,
        display: 'flex',
        alignItems: 'center',
        height: 75,
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: '100%'
    },
    text: {
        width: '27%',
        textAlign: 'center',
        color: ALMOST_BLACK
    },
    textLoading: {
        width: '100%',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    icon: {
        width: 20,
        height: 20,
        opacity: 0.7,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: MAGNIFYINGLASSBG,
        borderRadius: 5
    },
    iconDeletion: {
        backgroundColor: REDBACKGROUND
    },
    oddWrapper: {
        backgroundColor: WHITE
    },
    evenWrapper: {
        backgroundColor: ALMOST_WHITE
    },
    activeItem: {
        backgroundColor: VERY_VERY_LIGHT_GREY
    },
    headWrapper: {
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5,
        height: 50,
        backgroundColor: VERY_LIGHT_GREY
    }
});

