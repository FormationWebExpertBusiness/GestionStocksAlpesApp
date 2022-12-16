import {
    ScrollView,
    View
} from 'react-native';
import React, {useState} from 'react';
import {TABLESTYLES} from '../../style/tablesStyle';
import ScannedProductLine from './ScannedProductLine';
import type {ScannedProduct} from '../../types/ScannedProductType';
import DetailProductModal from '../detailProductModal/detailProductModal';
import {GET_PRODUCTS} from '../../graphql/query/getProducts';
import {GET_RACK} from '../../graphql/query/getRack';
import {useMutation} from '@apollo/client';
import {DELETE_PRODUCT} from '../../graphql/mutation/deleteProduct';

type ScannedProductTableProps = {
    loading: boolean;
    products: ScannedProduct[];
    rack_id: number;
    rack_level: number;
    remove?: boolean;
};

const ScannedProductTable = (props: ScannedProductTableProps): React.ReactElement => {

    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [idProductQuery, setIdProductQuery] = useState<number>(-1);
    const [indexProductQuery, setIndexProductQuery] = useState<number>(-1);

        const [deleteProductMutation, {loading}] = useMutation(DELETE_PRODUCT, {
            awaitRefetchQueries: true,
            refetchQueries: [
                {
                    query: GET_PRODUCTS,
                    fetchPolicy: 'network-only',
                    variables: {
                        rack_id: props.rack_id,
                        rack_level: props.rack_level
                    }
                },
                {
                    query: GET_RACK,
                    fetchPolicy: 'network-only',
                    variables: {
                        id: props.rack_id,
                        level: props.rack_level
                    }
                }
            ],
            onCompleted: (): void => {
                setIsModalVisible(false);
            }
        });

    function renderModal(): React.ReactElement {
            return (
                <DetailProductModal
                    id={idProductQuery}
                    loading={loading}
                    onDeletePress={(): void => { deleteProductMutation({variables: {id: props.products[indexProductQuery].id, user_id: 0}}); }}
                    isVisible={isModalVisible}
                    onBackdropPress={(): void => {setIsModalVisible(false);}}
                    remove
                />
            );
    }

    function renderProducts(): React.ReactElement[] {
        const SCANNEDPRODUCTSLINES: React.ReactElement[] = [];

        props.products.forEach((product, index): void => {
            SCANNEDPRODUCTSLINES.push(
                <ScannedProductLine
                    id={product.id}
                    key={index}
                    keyI={index}
                    rack_id={props.rack_id}
                    rack_level={props.rack_level}
                    onPress={(): void => {
                        setIdProductQuery(product.id);
                        setIsModalVisible(true);
                        setIndexProductQuery(index);
                    }}
                    product={product}
                />
            );
        });
        return SCANNEDPRODUCTSLINES;
    }

    return (
        <View style={TABLESTYLES.wrapper}>
            <ScannedProductLine
                    id={0}
                    head={true}
                    title1={'Catégorie'}
                    title2={'Modèle'}
                    title3={'N° série'}
            />
            <ScrollView>
                {renderProducts()}
            </ScrollView>
            {renderModal()}
        </View>
    );
};


export default ScannedProductTable;