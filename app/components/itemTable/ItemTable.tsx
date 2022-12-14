import {
    ScrollView,
    View
} from 'react-native';
import React from 'react';
import ItemLine from './ItemLine';
import {TABLESTYLES} from '../../style/tablesStyle';
import type {CommonItem} from '../../types/commonItemType';

type commonItemTable = {
    commonItem: CommonItem;
};

const ItemTable = (props: commonItemTable): React.ReactElement => {

    function renderItems(): React.ReactElement | React.ReactElement[] {
        const ITEMSLINES: React.ReactElement[] = [];
        const commonItem: CommonItem = props.commonItem;

        commonItem.items?.forEach((item, index): void => {
            ITEMSLINES.push(
                <ItemLine
                    keyI={index}
                    key={index}
                    id={item.id}
                    item={item}
                    model={commonItem.model}
                    brand={commonItem.brand.name}
                    category={commonItem.category.name}
                />
            );
        });
        return ITEMSLINES;
    }

    return (
        <View style={TABLESTYLES.wrapper}>
            <ItemLine
                    head={true}
                    title1={'N° série'}
                    title2={'Étage'}
                    title3={'Étagère'}
            />
            <ScrollView>
                {renderItems()}
            </ScrollView>
        </View>
    );
};


export default ItemTable;
