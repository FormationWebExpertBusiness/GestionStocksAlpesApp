/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    View,
    StyleSheet,
    Image,
    Text,
    Pressable
} from 'react-native';
import type {ReactElement} from 'react';
import React, {useState} from 'react';
import {ALMOST_BLACK, BLACK, CULTURED, DARK_BLACK, RED, WHITE} from '../../style/colors';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faLightbulb as faLightbulbOn} from '@fortawesome/free-solid-svg-icons/faLightbulb';
import {faLightbulb as faLightbulbOff} from '@fortawesome/free-regular-svg-icons/faLightbulb';
import Toast from 'react-native-root-toast';
import qrCodeScannerImg from '../../assets/qrCodeScannerImg.png';

const STYLES = StyleSheet.create({
    pageWrapper: {
        position: 'relative',
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
        top: -150,
        paddingBottom: 10,
        backgroundColor: DARK_BLACK,
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

const ScanPage = ({navigation}: any): ReactElement => {
    const [isLightOn, setIsLightOn] = useState(RNCamera.Constants.FlashMode.off);
    const [lightIcon, setLightIcon] = useState(faLightbulbOff);
    const [errorStatus, setErrorStatus] = useState(false);
    const [lightFeedback, setLightFeedback] = useState(`${BLACK}00`);

    function checkQrCodeData(data: string): void {
        let resData: unknown = {};
        try {
            resData = JSON.parse(data);
            setErrorStatus(false);
            navigation.navigate('ScannedProducts', {values: resData});
        } catch (error) {
            setErrorStatus(true);
            console.error(error);
        }
    }

    const onSuccess = (e: any): void => {
        checkQrCodeData(e.data);
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
            showMarker={false}
            reactivate={true}
            vibrate={true}
            reactivateTimeout={3000}
            onRead={onSuccess}
            flashMode={isLightOn}
            markerStyle={{borderColor: CULTURED, borderRadius: 15, borderWidth: 10, height: 200, width: 200}}
            containerStyle={STYLES.pageWrapper}
            cameraStyle={{height: '100%'}}
            bottomContent={
                <View style={STYLES.bottomWrapper}>
                    <Toast
                            hideOnPress={false}
                            visible={errorStatus}
                            backgroundColor={RED}
                            position={50}
                            duration={Toast.durations.LONG}
                            shadow={false}
                            animation={false}
                        >
                            <Text>Le QR code n'est pas valide</Text>
                        </Toast>
                        <View style={STYLES.imgWrapper}>
                            <Image
                                style={{height: 250, width: 250}}
                                source={qrCodeScannerImg}
                            />
                        </View>
                    <Pressable onPressOut={(): void => {setLightFeedback(`${BLACK}00`);}} onPressIn={(): void => {setLightFeedback(BLACK);}} onPress={(): void => {switchLight();}} style={[STYLES.iconWrapper, {backgroundColor: lightFeedback}]}>
                        <FontAwesomeIcon icon={lightIcon} size={30} color={WHITE} />
                    </Pressable>
                </View>
            }
        />
    );
};


export default ScanPage;
