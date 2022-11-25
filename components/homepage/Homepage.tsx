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

    const {data} = useQuery(GET_COMMONITEMS);
    console.log(data);

    // console.log(data.commonItems);

    return (
        <SafeAreaView>
            <CustomTopTabNavigator
                onPressScan={(): void => {navigation.navigate('Scan');}}
                onPressRemove={(): void => {navigation.navigate('RemoveScan');}}
                onPressAdd={(): void => {navigation.navigate('Add');}}
            />
                <View style={STYLES.wrapper}>
                    <CustomTextInput required password={false} placeholder={'Recherche'} />
                    <CommonItemTable items={ITEMS}/>
                </View>
        </SafeAreaView>
    );
};


export default HomePage;
