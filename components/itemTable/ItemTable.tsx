import {
    View,
    StyleSheet
} from 'react-native';
import React from 'react';
import ItemLine from './ItemLine';

const STYLES = StyleSheet.create({
    wrapper: {
        height: '100%',
        width: '100%',
        paddingBottom: 20
    }
});

type ItemTableProps = {
    items: {
            category: string;
            model: string;
            brand: string;
            numSeries: {
                numSerie: string;
                rackId: number;
                rackLevel: number;
            }[];
        }[];
};

const itemTable = (props: ItemTableProps): React.ReactElement => {

    function renderItems(): React.ReactElement[] {
        const ITEMSLINES: React.ReactElement[] = [];
        props.items.forEach((item, index): void => {
            ITEMSLINES.push(
                <ItemLine
                    key={index}
                    keyI={index}
                    category={item.category}
                    model={item.model}
                    brand={item.brand}
                    numSeries={item.numSeries}
                />
            );
        });
        return ITEMSLINES;
    }

    return (
        <View style={STYLES.wrapper}>
            <ItemLine
                    head={true}
                    category={'Catégorie'}
                    model={'Modèle'}
                    brand={'Marque'}
            />
            {renderItems()}
        </View>
    );
};


export default itemTable;
