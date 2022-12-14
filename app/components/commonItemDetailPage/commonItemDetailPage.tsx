import {
    View,
    StyleSheet,
    Text
} from 'react-native';
import React from 'react';
import {BLACK, CULTURED} from '../../style/colors';
import ItemTable from '../itemTable/ItemTable';
import DetailPageHeader from './detailPageHeader';
import CustomTopTabNavigator from '../CustomTopTabNavigator';
import {useQuery} from '@apollo/client';
import {GET_COMMONITEM_QUANTITY} from '../../graphql/query/getCommonItemQuantity';
import {GET_COMMONITEM_ITEMS} from '../../graphql/query/getCommonItemItems';
import type {CommonItem} from '../../types/commonItemType';

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
        height: '85%',
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

    const {commonItemId} = route.params;

    const commonItemQuantityData = useQuery(GET_COMMONITEM_QUANTITY, {
        fetchPolicy: 'network-only',
        variables: {
            commonItem_id: commonItemId
        }
    });

    const commonItemItemsData = useQuery(GET_COMMONITEM_ITEMS, {
        fetchPolicy: 'network-only',
        variables: {
            commonItem_id: commonItemId
        }
    });

    function renderHeader(): React.ReactElement {
        if(commonItemQuantityData.loading) {
            return (
                <View />
            );
        } else if(commonItemQuantityData.error) {
            return (
                <View>
                    <Text style={STYLES.textStyle}>Error : {commonItemQuantityData.error.message}</Text>
                </View>
            );
        }

        const commonItem: CommonItem = commonItemQuantityData.data.commonItem;

        return (
            <DetailPageHeader quantityUrgent={commonItem.quantity_urgent} quantityWarning={commonItem.quantity_warning} size={commonItem.quantity} title1={'Catégorie'} title2={'Modèle'} title3={'Marque'} content1={commonItem.category.name} content2={commonItem.brand.name} content3={commonItem.model} />
        );
    }

    function renderItemTable(): React.ReactElement {
        if(commonItemItemsData.loading) {
            return (
                <View />
            );
        } else if(commonItemItemsData.error) {
            return (
                <View>
                    <Text style={STYLES.textStyle}>Error : {commonItemItemsData.error.message}</Text>
                </View>
            );
        }

        const commonItem: CommonItem = commonItemItemsData.data.commonItem;

        return (
            <ItemTable commonItem={commonItem} />
        );
    }

    return (
        <>
            <CustomTopTabNavigator
                mode={'back'}
                onPressBack={(): void => { navigation.goBack(); } }
            />
                <View style={STYLES.pageWrapper}>
                    {renderHeader()}
                    <View style={STYLES.tableWrapper}>
                        {renderItemTable()}
                    </View>
                </View>
        </>
    );
};


export default CommonItemDetailPage;
