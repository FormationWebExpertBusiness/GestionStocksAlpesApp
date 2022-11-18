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

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
const CommonItemDetailPage = ({route}: any): React.ReactElement => {
    const {item} = route.params;

    return (
        <View style={STYLES.pageWrapper}>
            <Text style={STYLES.textStyle}>CommonItemDetail PAGE</Text>
            <Text style={STYLES.textStyle}>{item.category}</Text>
            <Text style={STYLES.textStyle}>{item.model}</Text>
            <Text style={STYLES.textStyle}>{item.brand}</Text>
            <Text style={STYLES.textStyle}>{item.serialNumber}</Text>
        </View>
    );
};


export default CommonItemDetailPage;
