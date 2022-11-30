/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
    ScrollView,
    View,
    StyleSheet
} from 'react-native';
import React from 'react';
import ItemLine from './ItemLine';
import {DARKBLUEBLACK} from '../../style/colors';

const STYLES = StyleSheet.create({
    wrapper: {
        marginTop: 20,
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5,
        shadowColor: DARKBLUEBLACK,
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowOpacity:  0.16,
        shadowRadius: 1.51,
        elevation: 2
    }
});

type ItemTableProps = {
    homeItems: {
        category: string;
        model: string;
        brand: string;
        items?: {
            serial_number: string;
            rack_id: number;
            rack_level: number;
        }[];
    };
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
const commonItemTable = (props: ItemTableProps): React.ReactElement => {

    function renderItems(): React.ReactElement[] {
        const ITEMSLINES: React.ReactElement[] = [];

        props.homeItems.items!.forEach((item, index): void => {
            ITEMSLINES.push(
                <ItemLine
                    key={index}
                    keyI={index}
                    serialNumber={item.serial_number}
                    rackLevel={item.rack_level}
                    rackId={item.rack_id}
                />
            );
        });
        return ITEMSLINES;
    }

    return (
        <View style={STYLES.wrapper}>
            <ItemLine
                    head={true}
                    serialNumber={'Numéro de série'}
                    rackLevel={'Etage'}
                    rackId={'Etagère'}
            />
            <ScrollView>
                {renderItems()}
            </ScrollView>
        </View>
    );
};


export default commonItemTable;
