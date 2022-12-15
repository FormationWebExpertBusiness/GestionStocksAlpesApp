import {
    View,
    StyleSheet,
    Text
} from 'react-native';
import React from 'react';
import {BLACK, CULTURED} from '../../style/colors';
import ProductTable from '../productTable/ProductTable';
import DetailPageHeader from './detailPageHeader';
import CustomTopTabNavigator from '../CustomTopTabNavigator';
import {useQuery} from '@apollo/client';
import {GET_COMMONPRODUCT_PRODUCTS} from '../../graphql/query/getCommonProductProducts';
import type {CommonProduct} from '../../types/commonProductType';
import {GET_COMMONPRODUCT_QUANTITY} from '../../graphql/query/getCommonProductQuantity';
import TableSkeleton from '../skeletons/tablesSkeleton/tableSkeleton';

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
const CommonProductDetailPage = ({navigation, route}: any): React.ReactElement => {

    const {commonProductId} = route.params;

    const commonProductQuantityData = useQuery(GET_COMMONPRODUCT_QUANTITY, {
        fetchPolicy: 'network-only',
        variables: {
            commonProduct_id: commonProductId
        }
    });

    const commonProductProductsData = useQuery(GET_COMMONPRODUCT_PRODUCTS, {
        fetchPolicy: 'network-only',
        variables: {
            commonProduct_id: commonProductId
        }
    });

    function renderHeader(): React.ReactElement {
        if(commonProductQuantityData.loading) {
            return (
                <DetailPageHeader title1={'Catégorie'} title2={'Modèle'} title3={'Marque'} skeleton/>
            );
        } else if(commonProductQuantityData.error) {
            return (
                <View>
                    <Text style={STYLES.textStyle}>Error : {commonProductQuantityData.error.message}</Text>
                </View>
            );
        }

        const commonProduct: CommonProduct = commonProductQuantityData.data.commonProduct;

        return (
            <DetailPageHeader quantityCritical={commonProduct.quantity_critical} quantityLow={commonProduct.quantity_low} size={commonProduct.quantity} title1={'Catégorie'} title2={'Modèle'} title3={'Marque'} content1={commonProduct.category.name} content2={commonProduct.brand.name} content3={commonProduct.model} />
        );
    }

    function renderProductTable(): React.ReactElement {
        if(commonProductProductsData.loading) {
            return (
                <TableSkeleton number={6} title1={'N° série'} title2={'Étage'} title3={'Ètagère'}/>
            );
        } else if(commonProductProductsData.error) {
            return (
                <View>
                    <Text style={STYLES.textStyle}>Error : {commonProductProductsData.error.message}</Text>
                </View>
            );
        }

        const commonProduct: CommonProduct = commonProductProductsData.data.commonProduct;

        return (
            <ProductTable commonProductId={commonProductId} commonProduct={commonProduct} />
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
                        {renderProductTable()}
                    </View>
                </View>
        </>
    );
};


export default CommonProductDetailPage;
