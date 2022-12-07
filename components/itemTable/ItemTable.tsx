/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
    ScrollView,
    View
} from 'react-native';
import React from 'react';
import ItemLine from './ItemLine';
import {TABLESTYLES} from '../../style/tablesStyle';

type ItemTableProps = {
    homeItems: {
        category: string;
        model: string;
        brand: string;
        items?: {
            serial_number: string;
            rack: {
                id: number;
                name: string;
            };
            rack_level: number;
            created_at: string;
        }[];
    };
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
const ItemTable = (props: ItemTableProps): React.ReactElement => {

    function renderItems(): React.ReactElement[] {
        const ITEMSLINES: React.ReactElement[] = [];

        props.homeItems.items!.forEach((item, index): void => {
            ITEMSLINES.push(
                <ItemLine
                    key={index}
                    created_at={item.created_at}
                    model={props.homeItems.model}
                    brand={props.homeItems.brand}
                    category={props.homeItems.category}
                    keyI={index}
                    serialNumber={item.serial_number}
                    rackLevel={item.rack_level}
                    rackName={item.rack.name}
                />
            );
        });
        return ITEMSLINES;
    }

    return (
        <View style={TABLESTYLES.wrapper}>
            <ItemLine
                    head={true}
                    serialNumber={'N° série'}
                    rackLevel={'Étage'}
                    rackName={'Étagère'}
            />
            <ScrollView>
                {renderItems()}
            </ScrollView>
        </View>
    );
};


export default ItemTable;
