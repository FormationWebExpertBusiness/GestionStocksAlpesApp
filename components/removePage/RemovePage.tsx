import {
    View,
    StyleSheet,
    Text
} from 'react-native';
import React from 'react';
import {BLACK, CULTURED} from '../../style/colors';
import {useQuery} from '@apollo/client';
import ScannedItemTable from '../scannedItemTable/ScannedItemTable';
import RemovePageHeader from './removePageHeader';
import {GET_ITEMS} from '../../graphql/query/getItems';
import {GET_RACK} from '../../graphql/query/getRack';
import CustomTopTabNavigator from '../CustomTopTabNavigator';

const STYLES = StyleSheet.create({
    pageWrapper: {
        width: '100%',
        paddingHorizontal: 20,
        height: '100%',
        backgroundColor: CULTURED
    },
    textStyle: {
        color: BLACK
    },
    pageContent: {
        height: '92%',
        paddingBottom: 150,
        marginTop: 20
    }
});

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
const RemovePage = ({navigation, route}: any): React.ReactElement => {

    const {values} = route.params;

    let items: {id: number; serial_number: string; category: {name: string;}; brand: {name: string;}; model: string; created_at: string; comment: string;}[];

    const {loading, error, data} = useQuery(GET_ITEMS, {
        variables: {
            rack_id: values.rack_id,
            rack_level: values.rack_level
        }
    });

    const rack_name = useQuery(GET_RACK, {
        fetchPolicy: 'network-only',
        variables: {
            id: values.rack_id,
            level: values.rack_level
        }
    });

    function getRackName(): string {
        if(rack_name.loading) {
            return '...';
        }
        if(rack_name.error) {
            return '...';
        }
        return rack_name.data.rack.name;
    }

    function getNbItem(): number | null {
        if(rack_name.loading) {
            return null;
        }
        if(rack_name.error) {
            return null;
        }
        return rack_name.data.rack.nb_item;
    }

    function getResult(): React.ReactElement {
        if(loading) return <Text style={STYLES.textStyle}>Loading...</Text>;
        if(error) return <Text style={STYLES.textStyle}>Error : {error.message}</Text>;
        items = data.items;
        return <ScannedItemTable loading={loading} rack_id={values.rack_id} rack_level={values.rack_level} items={items} remove={true}/>;
    }

    return (
        <>
            <CustomTopTabNavigator
                mode={'back'}
                onPressBack={(): void => { navigation.goBack(); } }
            />
            <View style={STYLES.pageWrapper}>
                <View style={STYLES.pageContent}>
                    <RemovePageHeader title1={'Étagère'} title2={'Étage'} size={getNbItem()} content1={getRackName()} content2={values.rack_level} />
                    {getResult()}
                </View>
            </View>
        </>
    );
};


export default RemovePage;
