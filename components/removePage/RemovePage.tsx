import {
    View,
    StyleSheet,
    Text
} from 'react-native';
import React from 'react';
import {BLACK, CULTURED} from '../../style/colors';
import GoBackButton from '../gobackButton';
import {useQuery, gql} from '@apollo/client';

const STYLES = StyleSheet.create({
    pageWrapper: {
        display: 'flex',
        flex: 1,
        backgroundColor: CULTURED
    },
    textStyle: {
        color: BLACK
    }
});

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
const RemovePage = ({navigation, route}: any): React.ReactElement => {

    const {values} = route.params;

    const GET_ITEMS = gql`
    query GetItems($rack_id: Int!, $rack_level: Int!) {
        items(rack_id: $rack_id, rack_level: $rack_level) {
			id
			serial_number
			comment
        }
      }
  `;

    const {loading, error, data} = useQuery(GET_ITEMS, {
        variables: {
            rack_id: values.rack_id,
            rack_level: values.rack_level
        }
    });

    function getResult(): React.ReactElement {
        if(loading) return <Text style={STYLES.textStyle}>Loading...</Text>;
        if(error) return <Text style={STYLES.textStyle}>Error : {error.message}</Text>;

        // eslint-disable-next-line @typescript-eslint/no-explicit-any, camelcase
        return data.items.map(({id, serial_number, comment}: any): React.ReactElement => {
            return (
                <View key={id}>
                    <Text style={STYLES.textStyle}>Id: {id}</Text>
                    <Text style={STYLES.textStyle}>Serial number: {serial_number}</Text>
                    <Text style={STYLES.textStyle}>Comment: {comment}</Text>
                </View>
            );
        }, []);
    }

    return (
        <View style={STYLES.pageWrapper}>
            <GoBackButton navigation={navigation} color={BLACK} size={20} />
            <Text style={STYLES.textStyle}>Remove PAGE</Text>
            {getResult()}
        </View>
    );
};


export default RemovePage;
