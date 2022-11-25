import {
    ScrollView,
    View,
    StyleSheet
} from 'react-native';
import React from 'react';
import CommonItemLine from './CommonItemLine';
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
            items: {
                numSerie: string;
                rackId: number;
                rackLevel: number;
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
                />
            );
        });
        return ITEMSLINES;
    }

    return (
        <View style={STYLES.wrapper}>
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
