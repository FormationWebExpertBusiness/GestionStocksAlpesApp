/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    ScrollView,
    View
} from 'react-native';
import React, {useState} from 'react';
import ProductLine from './ProductLine';
import {TABLESTYLES} from '../../style/tablesStyle';
import type {CommonProduct} from '../../types/commonProductType';
import DetailProductModal from '../detailProductModal/detailProductModal';
import {useMutation} from '@apollo/client';
import {DELETE_PRODUCT} from '../../graphql/mutation/deleteProduct';
import {GET_COMMONPRODUCT_QUANTITY} from '../../graphql/query/getCommonProductQuantity';
import {GET_COMMONPRODUCT_PRODUCTS} from '../../graphql/query/getCommonProductProducts';
import {MOVE_PRODUCT} from '../../graphql/mutation/moveProduct';
import {GET_PRODUCT_MODAL_DATA} from '../../graphql/query/getProductModalData';

type commonProductTable = {
    commonProduct: CommonProduct;
    commonProductId: number;
};

const ProductTable = (props: commonProductTable): React.ReactElement => {

    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [idProductQuery, setIdProductQuery] = useState<number>(0);
    const [confirmationModal, setConfirmationModal] = React.useState<boolean>(false);
    const [commentValue, setCommentValue] = useState<string>('');
    const [indexProductQuery, setIndexProductQuery] = useState<number>(1);

    const [deleteProductMutation, {loading}] = useMutation(DELETE_PRODUCT, {
        awaitRefetchQueries: true,
        refetchQueries: [
            {
                query: GET_COMMONPRODUCT_QUANTITY,
                fetchPolicy: 'network-only',
                variables: {
                    commonProduct_id: props.commonProductId
                }
            },
            {
                query: GET_COMMONPRODUCT_PRODUCTS,
                fetchPolicy: 'network-only',
                variables: {
                    commonProduct_id: props.commonProductId
                }
            }
        ],
        onCompleted: (): void => {
            setIsModalVisible(false);
            setConfirmationModal(false);
            setCommentValue('');
        }
    });


    const [moveProductMutation, moveProductStatus] = useMutation(MOVE_PRODUCT, {
        awaitRefetchQueries: true,
        refetchQueries: [
            {
                query: GET_COMMONPRODUCT_QUANTITY,
                fetchPolicy: 'network-only',
                variables: {
                    commonProduct_id: props.commonProductId
                }
            },
            {
                query: GET_COMMONPRODUCT_PRODUCTS,
                fetchPolicy: 'network-only',
                variables: {
                    commonProduct_id: props.commonProductId
                }
            },
            {
                query: GET_PRODUCT_MODAL_DATA,
                fetchPolicy: 'network-only',
                variables: {
                    product_id: idProductQuery
                }
            }
        ],
        onCompleted: (): void => {
            setIsModalVisible(false);
            setConfirmationModal(false);
            setCommentValue('');
        }
    });

    function renderModal(): React.ReactElement {
            return (
                <DetailProductModal
                    id={idProductQuery}
                    loading={loading}
                    commentValue={commentValue}
                    confirmationModal={confirmationModal}
                    setCommentValue={setCommentValue}
                    setConfirmationModal={setConfirmationModal}
                    moveLoading={moveProductStatus.loading}
                    onMovePress={moveProductMutation}
                    productId={props.commonProduct.products[indexProductQuery].id}
                    onDeletePress={(): void => {deleteProductMutation({variables: {id: props.commonProduct.products[indexProductQuery].id, comment: commentValue, user_id: 0}}); }}
                    isVisible={isModalVisible}
                    closeModal={(): void => {setIsModalVisible(false);}}
                    onBackdropPress={(): void => {setIsModalVisible(false);}}
                    remove
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
                        setIndexProductQuery(index);
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
                    title2={'Étagère'}
                    title3={'Étage'}
            />
            <ScrollView>
                {renderProducts()}
            </ScrollView>
            {renderModal()}
        </View>
    );
};


export default ProductTable;
