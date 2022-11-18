import {
    View,
    SafeAreaView,
    StyleSheet
} from 'react-native';
import React from 'react';
import ItemTable from '../itemTable/ItemTable';
import CustomTextInput from '../CustomTextInput';
import {ITEMS} from '../../jsons';
import CustomTopTabNavigator from '../../components/CustomTopTabNavigator';

const STYLES = StyleSheet.create({
    wrapper: {
        width: '100%',
        marginTop: 20,
        paddingHorizontal: 20,
        height: '89%',
        paddingBottom: 50
    }
});

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
const HomePage = ({navigation}: any): React.ReactElement => {
    return (
        <SafeAreaView>
            <CustomTopTabNavigator
                onPressScan={(): void => {navigation.navigate('Scan');}}
                onPressRemove={(): void => {navigation.navigate('Remove');}}
                onPressAdd={(): void => {navigation.navigate('Add');}}
            />
                <View style={STYLES.wrapper}>
                    <CustomTextInput required password={false} placeholder={'Recherche'} />
                    <ItemTable items={ITEMS}/>
                </View>
        </SafeAreaView>
    );
};


export default HomePage;
