import {
    View,
    StyleSheet
} from 'react-native';
import React from 'react';
import {BLACK, CULTURED} from '../../style/colors';
import ItemTable from '../itemTable/ItemTable';
import DetailPageHeader from './detailPageHeader';
import CustomTopTabNavigator from '../CustomTopTabNavigator';

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
        height: '79%',
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
        <>
            <CustomTopTabNavigator
                mode={'back'}
                onPressBack={(): void => { navigation.goBack(); } }
            />
            <View style={STYLES.pageWrapper}>
                <DetailPageHeader quantityUrgent={item.quantity_urgent} quantityWarning={item.quantity_warning} size={Object.keys(item.items).length} title1={'Catégorie'} title2={'Modèle'} title3={'Marque'} content1={item.category} content2={item.brand} content3={item.model} />
                <View style={STYLES.tableWrapper}>
                    <ItemTable homeItems={item} />
                </View>
            </View></>
    );
};


export default CommonItemDetailPage;
