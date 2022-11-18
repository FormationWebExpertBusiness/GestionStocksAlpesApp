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
        flex: 1,
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

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
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
            <ScrollView>
                {renderItems()}
            </ScrollView>
        </View>
    );
};


export default itemTable;
