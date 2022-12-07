/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    View,
    Text,
    SafeAreaView,
    StyleSheet
} from 'react-native';
import React from 'react';
import CommonItemTable from '../commonItemTable/CommonItemTable';
import CustomTextInput from '../CustomTextInput';
import CustomTopTabNavigator from '../../components/CustomTopTabNavigator';
import {useQuery} from '@apollo/client';
import {GET_COMMONITEMS} from '../../graphql/query/getCommonItems';
import {BLACK} from '../../style/colors';

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

  type CommonItem = {
        category: string;
        model: string;
        quantity_warning: number;
        quantity_urgent: number;
        brand: string;
        items: {
            numSerie: string;
            rackId: number;
            rackName: string;
            rackLevel: number;
            createdAt: string;
            comment?: string;
        }[];
  };

  let commonItems: CommonItem[] = [];

    const commonItemsData = useQuery(GET_COMMONITEMS);

    function createJsonFromData(data: any): CommonItem[] {
        const JSONDATA: CommonItem[] = [];
        data.forEach((commonItem: any): void => {
            JSONDATA.push({
                category: commonItem.category.name,
                model: commonItem.model,
                quantity_warning: commonItem.quantity_warning,
                quantity_urgent: commonItem.quantity_urgent,
                brand: commonItem.brand.name,
                items: commonItem.items
            });
        });
        return JSONDATA;
      }

      if(commonItemsData.data !== undefined) {
        commonItems = createJsonFromData(commonItemsData.data.commonItems);
      }

    function renderTable(): React.ReactElement {
        if(commonItemsData.loading) {
            return <View>
                <Text style={STYLES.textStyle}>Loading...</Text>
                </View>;
        } else if(commonItemsData.error) {
            return <View>
                <Text style={STYLES.textStyle}>Error : {commonItemsData.error.message}</Text>
                </View>;
        }
        return <CommonItemTable items={commonItems}/>;
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
