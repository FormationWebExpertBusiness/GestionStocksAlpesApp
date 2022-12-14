/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    View,
    Text,
    SafeAreaView,
    StyleSheet
} from 'react-native';
import React from 'react';
import CommonProductTable from '../commonProductTable/CommonProductTable';
import CustomTextInput from '../CustomTextInput';
import CustomTopTabNavigator from '../CustomTopTabNavigator';
import {useQuery} from '@apollo/client';
import {GET_COMMONPRODUCTS} from '../../graphql/query/getCommonProducts';
import {BLACK} from '../../style/colors';
import TableSkeleton from '../skeletons/tablesSkeleton/tableSkeleton';

const STYLES = StyleSheet.create({
    wrapper: {
        width: '100%',
        marginTop: 20,
        paddingHorizontal: 20,
        height: '81%',
        paddingBottom: 50
    },
    textStyle: {
        height: 100,
        width: 100,
        color: BLACK
    }
});

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
const HomePage = ({navigation}: any): React.ReactElement => {

    const commonProductsData = useQuery(GET_COMMONPRODUCTS, {
        fetchPolicy: 'network-only'
    });

    function renderTable(): React.ReactElement {
        if(commonProductsData.loading) {
            return (
                    <TableSkeleton number={6} title1={'Catégorie'} title2={'Modèle'} title3={'Marque'} animation='pulse' />
            );
        } else if(commonProductsData.error) {
            return <View>
                <Text style={STYLES.textStyle}>Error : {commonProductsData.error.message}</Text>
                </View>;
        }
        return <CommonProductTable commonProducts={commonProductsData.data.commonProducts}/>;
    }

    return (
        <SafeAreaView>
            <CustomTopTabNavigator
                mode={'all'}
                onPressScan={(): void => {navigation.navigate('Scan');}}
                onPressRemove={(): void => {navigation.navigate('RemoveScan');}}
                onPressAdd={(): void => {navigation.navigate('Add');}}
            />
            <View style={STYLES.wrapper}>
                <CustomTextInput required password={false} placeholder={'Recherche'} />
                {renderTable()}
            </View>
        </SafeAreaView>
    );
};


export default HomePage;
