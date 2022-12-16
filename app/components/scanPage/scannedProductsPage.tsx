import {useQuery} from '@apollo/client';
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {GET_PRODUCTS} from '../../graphql/query/getProducts';
import {GET_RACK} from '../../graphql/query/getRack';
import {BLACK, CULTURED} from '../../style/colors';
import RemovePageHeader from './scanPageHeader';
import CustomTopTabNavigator from '../CustomTopTabNavigator';
import TableSkeleton from '../skeletons/tablesSkeleton/tableSkeleton';
import ScannedProductTable from '../scannedProductTable/ScannedProductTable';
import AddForm from './addForm';

const STYLES = StyleSheet.create({
    pageWrapper: {
        width: '100%',
        paddingHorizontal: 20,
        height: '100%',
        backgroundColor: CULTURED
    },
    text: {
        color: BLACK
    },
    pageContent: {
        height: '88%',
        paddingBottom: 150,
        marginTop: 20
    }
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ScannedProductsPage = ({navigation, route}: any): React.ReactElement => {

    const [isFormModal, setIsFormModal] = React.useState<boolean>(false);

    const {values} = route.params;

    const {loading, error, data} = useQuery(GET_PRODUCTS, {
        fetchPolicy: 'network-only',
        variables: {
            rack_id: values.rack_id,
            rack_level: values.rack_level
        }
    });

    const rackData = useQuery(GET_RACK, {
        fetchPolicy: 'network-only',
        variables: {
            id: values.rack_id,
            level: values.rack_level
        }
    });

    function renderFormModal(): React.ReactElement {
        if(rackData.loading) {
            return (
                <View />
            );
        } else if(rackData.error) {
            return (
                <View />
            );
        }
        return (
            <AddForm rackId={values.rack_id} onBackdropPress={(): void => {setIsFormModal(false);}} isVisible={isFormModal} rackName={rackData.data.rack.name} rackLevel={values.rack_level} />
        );
    }

    function renderHeader(): React.ReactElement {
        if(rackData.loading) {
            return (
                <RemovePageHeader title1={'Étagère'} title2={'Étage'} skeleton />
            );
        } else if(rackData.error) {
            return (
                <View>
                    <Text style={STYLES.text}>Error : {rackData.error.message}</Text>
                </View>
            );
        }

        return (
            <RemovePageHeader title1={'Étagère'} title2={'Étage'} size={rackData.data.rack.nb_products} content1={rackData.data.rack.name} content2={values.rack_level} />
        );
    }

    function renderResults(): React.ReactElement {
        if(loading) {
            return (
                <TableSkeleton number={6} title1={'Catégorie'} title2={'Modèle'} title3={'N° série'} animation='pulse' />
            );
        } else if(error) {
            return (
                <View>
                    <Text style={STYLES.text}>Error : {error.message}</Text>
                </View>
            );
        }

        return (
            <ScannedProductTable loading={loading} rack_id={values.rack_id} rack_level={values.rack_level} products={data.products} remove={true}/>
        );
    }


    return (
        <>
            <CustomTopTabNavigator
                mode={'plus'}
                onPressBack={(): void => { navigation.goBack(); } }
                onPressPlus={(): void => { setIsFormModal(true); } }
            />
            <View style={STYLES.pageWrapper}>
                <View style={STYLES.pageContent}>
                    {renderHeader()}
                    {renderResults()}
                </View>
            </View>
            {renderFormModal()}
        </>
    );
};

export default ScannedProductsPage;
