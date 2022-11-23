import {
    View,
    StyleSheet,
    Text
} from 'react-native';
import React from 'react';
import {BLACK, CULTURED} from '../../style/colors';
import GoBackButton from '../gobackButton';

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

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
const RemovePage = ({navigation}: any): React.ReactElement => {
    return (
        <View style={STYLES.pageWrapper}>
            <GoBackButton navigation={navigation} color={BLACK} />
            <Text style={STYLES.textStyle}>Remove PAGE</Text>
        </View>
    );
};


export default RemovePage;
