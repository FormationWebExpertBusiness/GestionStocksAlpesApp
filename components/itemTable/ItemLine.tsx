import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import React from 'react';
import {WHITE, VERY_LIGHT_GREY, ALMOST_WHITE, ALMOST_BLACK} from '../../style/colors';

const STYLES = StyleSheet.create({
    wrapper: {
        paddingBottom: 2,
        display: 'flex',
        height: 50,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    },
    text: {
        width: '30%',
        textAlign: 'center',
        color: ALMOST_BLACK
    },
    oddWrapper: {
        backgroundColor: WHITE
    },
    evenWrapper: {
        backgroundColor: ALMOST_WHITE
    },
    headWrapper: {
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5,
        backgroundColor: VERY_LIGHT_GREY
    }
});


type ItemLineProps = {
    keyI?: number;
    head?: boolean;
    category: string;
    model: string;
    brand: string;
    numSeries?: {
        numSerie: string;
        rackId: number;
        rackLevel: number;
    }[];
};
const itemLine = (props: ItemLineProps): React.ReactElement => {

    function getWrapperStyle(): object {
        if(props.head) {
            return STYLES.headWrapper;
        }
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return props.keyI! % 2 === 0 ? STYLES.evenWrapper : STYLES.oddWrapper;
    }

    return (
        <View style={[STYLES.wrapper, getWrapperStyle()]}>
            <Text style={STYLES.text} numberOfLines={1}>{props.category}</Text>
            <Text style={STYLES.text} numberOfLines={1}>{props.model}</Text>
            <Text style={STYLES.text} numberOfLines={1}>{props.brand}</Text>
        </View>
    );
};


export default itemLine;
