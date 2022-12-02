import {
    ScrollView,
    View
} from 'react-native';
import React from 'react';
import CommonItemLine from './CommonItemLine';
import {TABLESTYLES} from '../../style/tablesStyle';

type ItemTableProps = {
    items: {
            category: string;
            model: string;
            quantity_warning: number;
            quantity_urgent: number;
            brand: string;
            items: {
                numSerie: string;
                rackId: number;
                rackLevel: number;
                createdAt: string;
            }[];
        }[];
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
const commonItemTable = (props: ItemTableProps): React.ReactElement => {

    function renderItems(): React.ReactElement[] {
        const ITEMSLINES: React.ReactElement[] = [];
        props.items.forEach((item, index): void => {
            ITEMSLINES.push(
                <CommonItemLine
                    key={index}
                    keyI={index}
                    category={item.category}
                    model={item.model}
                    brand={item.brand}
                    items={item.items}
                    quantity_warning={item.quantity_warning}
                    quantity_urgent={item.quantity_urgent}
                />
            );
        });
        return ITEMSLINES;
    }

    return (
        <View style={TABLESTYLES.wrapper}>
            <CommonItemLine
                    head={true}
                    category={'Catégorie'}
                    model={'Modèle'}
                    brand={'Marque'}
            />
            <ScrollView>
                {renderItems()}
            </ScrollView>
        </View>
    );
};


export default commonItemTable;
