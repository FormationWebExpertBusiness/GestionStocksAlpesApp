import {
    ScrollView,
    View
} from 'react-native';
import React from 'react';
import CommonItemLine from './CommonItemLine';
import {TABLESTYLES} from '../../style/tablesStyle';
import type {CommonItem} from '../../types/commonItemType';

type CommonItemTable = {
    commonItems: CommonItem[];
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
const commonItemTable = (props: CommonItemTable): React.ReactElement => {

    function renderItems(): React.ReactElement[] {
        const ITEMSLINES: React.ReactElement[] = [];
        props.commonItems.forEach((item, index): void => {
            ITEMSLINES.push(
                <CommonItemLine
                    key={index}
                    keyI={index}
                    id={item.id}
                    category={item.category.name}
                    model={item.model}
                    brand={item.brand.name}
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
