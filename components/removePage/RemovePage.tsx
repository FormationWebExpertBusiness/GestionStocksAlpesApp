import {
    View,
    StyleSheet,
    Text
} from 'react-native';
import React from 'react';
import {BLACK, CULTURED} from '../../style/colors';
import GoBackButton from '../gobackButton';
import {useQuery, gql} from '@apollo/client';
import ScannedItemTable from '../scannedItemTable/ScannedItemTable';

const STYLES = StyleSheet.create({
    pageWrapper: {
        width: '100%',
        marginTop: 20,
        paddingHorizontal: 20,
        height: '81%',
        paddingBottom: 50,
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
                    model
                    brand {
                        name
                    }
                    category {
                        name
                    }
                    created_at
                    comment
        }
    }
  `;

  const GET_RACK_NAME = gql`
  query GetRackName($id: ID!) {
      rack(id: $id) {
            name
      }
  }
`;

    const {loading, error, data} = useQuery(GET_ITEMS, {
        variables: {
            rack_id: values.rack_id,
            rack_level: values.rack_level
        }
    });

    const rack_name = useQuery(GET_RACK_NAME, {
        variables: {
            id: values.rack_id
        }
    });

    function getRackName(): React.ReactElement {
        if(rack_name.loading) {
            return <Text>Loading...</Text>;
        }
        if(rack_name.error) {
            return <Text>Error {rack_name.error.message}</Text>;
        }
        return <Text>{rack_name.data.rack.name}</Text>;
    }

    function getResult(): React.ReactElement {
        if(loading) return <Text style={STYLES.textStyle}>Loading...</Text>;
        if(error) return <Text style={STYLES.textStyle}>Error : {error.message}</Text>;

        const items: {id: number; serial_number: string; category: {name: string;}; model: string; created_at: string; comment: string;}[] = data.items;
        console.log(items);
        return <ScannedItemTable items={items} remove={true}/>;
    }

    return (
        <View style={STYLES.pageWrapper}>
            <GoBackButton navigation={navigation} color={BLACK} size={20} />
            <Text style={STYLES.textStyle}>{getRackName()}</Text>
            {getResult()}
        </View>
    );
};


export default RemovePage;
