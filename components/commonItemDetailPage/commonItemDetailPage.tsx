import {
    View,
    StyleSheet,
    Text
} from 'react-native';
import React from 'react';
import {BLACK, CULTURED} from '../../style/colors';
import ItemTable from '../itemTable/ItemTable';
import GoBackButton from '../gobackButton';

const STYLES = StyleSheet.create({
    pageWrapper: {
        display: 'flex',
        paddingHorizontal: 20,
        paddingTop: 20,
        flex: 1,
        backgroundColor: CULTURED
    },
    textStyle: {
        color: BLACK,
        textAlign: 'center',
        width: '33%'
    },
    tableWrapper: {
        width: '100%',
        height: '89%',
        paddingBottom: 50
    },
    headerWrapper: {
        flexDirection: 'row'
    },
    backArrow: {
        marginBottom: 20
    }
});

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
const CommonItemDetailPage = ({navigation, route}: any): React.ReactElement => {
    const {item} = route.params;

    return (
        <View style={STYLES.pageWrapper}>
            <View style={STYLES.backArrow}>
                <GoBackButton navigation={navigation} color={BLACK} size={30} />
            </View>
            <View style={STYLES.headerWrapper}>
                <Text style={STYLES.textStyle}>{item.category}</Text>
                <Text style={STYLES.textStyle}>{item.model}</Text>
                <Text style={STYLES.textStyle}>{item.brand}</Text>
            </View>
            <View style={STYLES.tableWrapper}>
                <ItemTable homeItems={item} />
            </View>
        </View>
    );
};


export default CommonItemDetailPage;
