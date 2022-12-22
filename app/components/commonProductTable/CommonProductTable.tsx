import {
    ScrollView,
    View
} from 'react-native';
import type {ReactElement} from 'react';
import React from 'react';
import CommonProductLine from './CommonProductLine';
import {TABLESTYLES} from '../../style/tablesStyle';
import type {CommonProduct} from '../../types/commonProductType';

type CommonProductTable = {
    commonProducts: CommonProduct[];
};

const commonProductTable = (props: CommonProductTable): ReactElement => {

    function renderProducts(): ReactElement[] {
        const PRODUCTSLINES: ReactElement[] = [];
        props.commonProducts.forEach((product, index): void => {
            PRODUCTSLINES.push(
                <CommonProductLine
                    key={index}
                    keyI={index}
                    id={product.id}
                    category={product.category.name}
                    model={product.model}
                    brand={product.brand.name}
                />
            );
        });
        return PRODUCTSLINES;
    }

    return (
        <View style={TABLESTYLES.wrapper}>
            <CommonProductLine
                    head={true}
                    category={'Catégorie'}
                    model={'Modèle'}
                    brand={'Marque'}
            />
            <ScrollView>
                {renderProducts()}
            </ScrollView>
        </View>
    );
};


export default commonProductTable;
