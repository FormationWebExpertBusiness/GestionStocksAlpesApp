/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    View,
    SafeAreaView,
    StyleSheet
} from 'react-native';
import React from 'react';
import CommonItemTable from '../commonItemTable/CommonItemTable';
import CustomTextInput from '../CustomTextInput';
import {ITEMS} from '../../jsons';
import CustomTopTabNavigator from '../../components/CustomTopTabNavigator';
import {useQuery, gql} from '@apollo/client';
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
        color: BLACK
    }
});

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
const HomePage = ({navigation}: any): React.ReactElement => {

    const GET_COMMONITEMS = gql`
    query GetCommonItems {
        commonItems {
            id
            model
            brand {
                name
            }
            category {
                name
            }
            items {
                serial_number
                rack_id
                rack_level
            }
        }
      }
  `;

  type CommonItem = {
        category: string;
        model: string;
        brand: string;
        items: {
            numSerie: string;
            rackId: number;
            rackLevel: number;
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
                brand: commonItem.brand.name,
                items: commonItem.items
            });
        });
        return JSONDATA;
      }

      if(commonItemsData.data !== undefined) {
        commonItems = createJsonFromData(commonItemsData.data.commonItems);
      }

    return (
        <SafeAreaView>
            <CustomTopTabNavigator
                onPressScan={(): void => {navigation.navigate('Scan');}}
                onPressRemove={(): void => {navigation.navigate('RemoveScan');}}
                onPressAdd={(): void => {navigation.navigate('Add');}}
            />
                <View style={STYLES.wrapper}>
                    <CustomTextInput required password={false} placeholder={'Recherche'} />
                    <CommonItemTable items={commonItems}/>
                </View>
        </SafeAreaView>
    );
};


export default HomePage;
