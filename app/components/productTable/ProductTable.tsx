import {
    ScrollView,
    View
} from 'react-native';
import React, {useState} from 'react';
import ProductLine from './ProductLine';
import {TABLESTYLES} from '../../style/tablesStyle';
import type {CommonProduct} from '../../types/commonProductType';
import DetailProductModal from '../detailProductModal/detailProductModal';

type commonProductTable = {
    commonProduct: CommonProduct;
};

const ProductTable = (props: commonProductTable): React.ReactElement => {

    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [idProductQuery, setIdProductQuery] = useState<number>(0);

    function renderModal(): React.ReactElement {
            return (
                <DetailProductModal
                    id={idProductQuery}
                    isVisible={isModalVisible}
                    onBackdropPress={(): void => {setIsModalVisible(false);}}
                />
            );
    }

    function renderProducts(): React.ReactElement | React.ReactElement[] {
        const PRODUCTSLINES: React.ReactElement[] = [];
        const commonProduct: CommonProduct = props.commonProduct;

        commonProduct.products?.forEach((product, index): void => {
            PRODUCTSLINES.push(
                <ProductLine
                    keyI={index}
                    key={index}
                    id={product.id}
                    product={product}
                    onPress={(): void => {
                        setIdProductQuery(product.id);
                        setIsModalVisible(true);
                    }}
                    model={commonProduct.model}
                    brand={commonProduct.brand.name}
                    category={commonProduct.category.name}
                />
            );
        });
        return PRODUCTSLINES;
    }

    return (
        <View style={TABLESTYLES.wrapper}>
            <ProductLine
                    head={true}
                    title1={'N° série'}
                    title2={'Étage'}
                    title3={'Étagère'}
            />
            <ScrollView>
                {renderProducts()}
            </ScrollView>
            {renderModal()}
        </View>
    );
};


export default ProductTable;
