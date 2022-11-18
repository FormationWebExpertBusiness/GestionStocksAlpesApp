import {
    View,
    StyleSheet
} from 'react-native';
import React from 'react';
import ItemTable from '../itemTable/ItemTable';
import CustomTextInput from '../CustomTextInput';
import {ITEMS} from '../../jsons';

const STYLES = StyleSheet.create({
    pageWrapper: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        flex: 1
    },
    customInput: {
        marginBottom: 25
    }
});

const homePage = (): React.ReactElement => {
    return (
        <View style={STYLES.pageWrapper}>
            <View style={STYLES.customInput}>
                <CustomTextInput required password={false} placeholder={'Recherche'} />
            </View>
            <ItemTable items={ITEMS}/>
        </View>
    );
};


export default homePage;
