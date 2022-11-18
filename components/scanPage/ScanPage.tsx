import {
    View,
    StyleSheet,
    Text
} from 'react-native';
import React from 'react';
import {BLACK, CULTURED} from '../../style/colors';

const STYLES = StyleSheet.create({
    pageWrapper: {
        display: 'flex',
        flex: 1,
        backgroundColor: CULTURED
    },
    textStyle: {
        color: BLACK
    }
});

const ScanPage = (): React.ReactElement => {
    return (
        <View style={STYLES.pageWrapper}>
            <Text style={STYLES.textStyle}>SCAN PAGE</Text>
        </View>
    );
};


export default ScanPage;
