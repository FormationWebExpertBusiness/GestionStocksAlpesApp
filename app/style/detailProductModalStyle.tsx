import {StyleSheet} from 'react-native';
import {ALMOST_BLACK, ALMOST_WHITE, BLACK, BUTTONPURPLE, BUTTONRED, CULTURED, DARKBLUEBLACK, WHITE} from './colors';

export const DETAIL_MODAL_STYLES = StyleSheet.create({
    modalWrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
        height: '70%',
        width: '90%',
        paddingTop: 0,
        paddingBottom: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        backgroundColor: CULTURED
    },
    textStyle: {
        width: '50%',
        color: ALMOST_BLACK,
        textAlign: 'center'
    },
    componentWrapper: {
        display: 'flex',
        flexDirection: 'column',
        padding: 10,
        borderRadius: 5,
        backgroundColor: CULTURED,
        shadowColor: DARKBLUEBLACK,
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowOpacity: 0.16,
        shadowRadius: 1.51,
        elevation: 2
    },
    textContent: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between'
    },
    headerWrapper: {
        flexDirection: 'row',
        opacity: 0.4,
        width: '100%',
        justifyContent: 'space-between'
    },
    contentWrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    buttonWrapper: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    },
    button: {
        height: 40,
        marginTop: 20,
        alignItems: 'center',
        width: 100,
        color: WHITE,
        justifyContent: 'center',
        borderRadius: 5
    },
    buttonDelete: {
        backgroundColor: BUTTONRED,
        borderWidth: 1,
        borderColor: BUTTONRED
    },
    buttonDeplace: {
        backgroundColor: BUTTONPURPLE,
        borderWidth: 1,
        borderColor: BUTTONPURPLE
    },
    buttonCancel: {
        position: 'absolute',
        top: 0,
        right: 0,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        width: 40
    },
    buttonText: {
        color: ALMOST_WHITE,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    lottie: {
        height: 70,
        width: 70,
        fontSize: 40
    }
});

export const QRCODE_STYLES = StyleSheet.create({
    pageWrapper: {
        position: 'relative',
        marginTop: -270,
        display: 'flex',
        flex: 1,
        backgroundColor: CULTURED
    },
    textStyle: {
        color: BLACK
    },
    centerText: {
        position: 'absolute',
        left: 0,
        backgroundColor: WHITE,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textBold: {
        fontWeight: '500',
        color: WHITE
    },
    lightText: {
        fontSize: 18,
        color: ALMOST_BLACK
    },
    bottomWrapper: {
        position: 'absolute',
        top: -370,
        paddingBottom: 10,
        backgroundColor: '#000000C4',
        borderRadius: 40,
        height: 75,
        width: 75,
        justifyContent: 'center'
    },
    iconWrapper: {
        display: 'flex',
        height: 75,
        borderRadius: 40,
        width: 75,
        marginBottom: 240,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    imgWrapper: {
        marginLeft: -88,
        top: -85,
        height: 250,
        width: 250
    }
});
