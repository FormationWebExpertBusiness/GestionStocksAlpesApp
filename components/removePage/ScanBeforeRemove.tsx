import {
    View,
    StyleSheet,
    Text,
    Linking
} from 'react-native';
import React from 'react';
import {ALMOST_BLACK, AVERAGE_GREY, BLACK, CHARCOAL_GREY, CULTURED} from '../../style/colors';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {Switch} from '@rneui/themed';
import {RNCamera} from 'react-native-camera';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faLightbulb as faLightbulbOn} from '@fortawesome/free-solid-svg-icons/faLightbulb';
import {faLightbulb as faLightbulbOff} from '@fortawesome/free-regular-svg-icons/faLightbulb';
import GoBackButton from '../gobackButton';

const STYLES = StyleSheet.create({
    pageWrapper: {
        display: 'flex',
        flex: 1,
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
        display: 'flex',
        marginTop: 50,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    iconSwitchWrapper: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
const ScanBeforeRemove = ({navigation}: any): React.ReactElement => {
    const [isLightOn, setIsLightOn] = React.useState(RNCamera.Constants.FlashMode.off);
    const [lightSwitchvalue, setLightSwitchValue] = React.useState(false);
    const [lightText, setLightText] = React.useState('Allumez le flash');
    const [lightIcon, setLightIcon] = React.useState(faLightbulbOff);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onSuccess = (e: any): void => {
        console.log(e);
        navigation.navigate('Remove');
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        // Linking.openURL(e.data).catch((err: any): void => { console.error('An error occurred', err); });
    };

    function switchLightMode(): void {
        setIsLightOn(isLightOn === RNCamera.Constants.FlashMode.off ? RNCamera.Constants.FlashMode.torch : RNCamera.Constants.FlashMode.off);
    }

    function switchLightText(): void {
        setLightText(lightText === 'Éteignez le flash' ? 'Allumez le flash' : 'Éteignez le flash');
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
        switchLightText();
        switchLightMode();
    }

    return (
        <QRCodeScanner
            showMarker={true}
            onRead={onSuccess}
            reactivate={true}
            vibrate={true}
            markerStyle={{borderColor: CULTURED}}
            flashMode={isLightOn}
            containerStyle={STYLES.pageWrapper}
            topContent={
                <View>
                    <GoBackButton navigation={navigation} color={BLACK} />
                    <Text style={STYLES.centerText}>
                        Scannez le QrCode d'une étagère pour visualiser à son contenu et pouvoir le retirer !
                    </Text>
                </View>
            }
            bottomContent={
                <View style={STYLES.bottomWrapper}>
                    <Text style={STYLES.lightText}>{lightText}</Text>
                    <View style={STYLES.iconSwitchWrapper}>
                        <FontAwesomeIcon color={ALMOST_BLACK} icon={lightIcon} size={20} />
                        <Switch
                            color="#252d3a"
                            trackColor={{false: AVERAGE_GREY, true: CHARCOAL_GREY}}
                            value={lightSwitchvalue}
                            onValueChange={(): void => {setLightSwitchValue(!lightSwitchvalue); switchLight();}}
                        />
                    </View>
                </View>
            }
        />
    );
};


export default ScanBeforeRemove;
