import {
    View,
    StyleSheet,
    Linking,
    Pressable
} from 'react-native';
import React from 'react';
import {ALMOST_BLACK, BLACK, CULTURED, WHITE} from '../../style/colors';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faLightbulb as faLightbulbOn} from '@fortawesome/free-solid-svg-icons/faLightbulb';
import {faLightbulb as faLightbulbOff} from '@fortawesome/free-regular-svg-icons/faLightbulb';

const STYLES = StyleSheet.create({
    pageWrapper: {
        position: 'relative',
        backgroundColor: CULTURED
    },
    textStyle: {
        color: BLACK
    },
    centerText: {
        flex: 1,
        fontSize: 18,
        padding: 32,
        color: ALMOST_BLACK
    },
    textBold: {
        fontWeight: '500',
        color: '#000'
    },
    lightText: {
        fontSize: 18,
        color: ALMOST_BLACK
    },
    bottomWrapper: {
        position: 'absolute',
        top: -150,
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
        flexDirection: 'row',
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

const ScanPage = (): React.ReactElement => {
    const [isLightOn, setIsLightOn] = React.useState(RNCamera.Constants.FlashMode.off);
    const [lightIcon, setLightIcon] = React.useState(faLightbulbOff);
    const [lightFeedback, setLightFeedback] = React.useState('#00000000');


    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onSuccess = (e: any): void => {
        console.log(e.data);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Linking.openURL(e.data).catch((err: any): void => { console.error('An error occurred', err); });
    };

    function switchLightMode(): void {
        setIsLightOn(isLightOn === RNCamera.Constants.FlashMode.off ? RNCamera.Constants.FlashMode.torch : RNCamera.Constants.FlashMode.off);
    }

    function switchLightIcon(): void {
        if(isLightOn === RNCamera.Constants.FlashMode.off) {
            setLightIcon(faLightbulbOn);
        } else {
            setLightIcon(faLightbulbOff);
        }
    }

    function switchLight(): void {
        switchLightIcon();
        switchLightMode();
    }

    return (
        <QRCodeScanner
            showMarker={true}
            reactivate={true}
            vibrate={true}
            onRead={onSuccess}
            flashMode={isLightOn}
            markerStyle={{borderColor: CULTURED, borderRadius: 15, borderWidth: 10, height: 200, width: 200}}
            containerStyle={STYLES.pageWrapper}
            cameraStyle={{height: '100%'}}
            bottomContent={
                <View style={STYLES.bottomWrapper}>
                    <Pressable onPressOut={(): void => {setLightFeedback('#00000000');}} onPressIn={(): void => {setLightFeedback('#000000');}} onPress={(): void => {switchLight();}} style={[STYLES.iconWrapper, {backgroundColor: lightFeedback}]}>
                        <FontAwesomeIcon icon={lightIcon} size={30} color={WHITE} />
                    </Pressable>
                </View>
            }
        />
    );
};


export default ScanPage;
