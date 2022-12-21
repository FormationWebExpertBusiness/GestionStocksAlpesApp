/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    ScrollView,
    Text,
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
import Toast from 'react-native-root-toast';
import {ERROR, SUCCESS, WHITE} from '../../style/colors';

type commonProductTable = {
    commonProduct: CommonProduct;
    commonProductId: number;
};

const ProductTable = (props: commonProductTable): React.ReactElement => {

    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [idProductQuery, setIdProductQuery] = useState<number>(1);
    const [confirmationModal, setConfirmationModal] = React.useState<boolean>(false);
    const [commentValue, setCommentValue] = useState<string>('');
    const [indexProductQuery, setIndexProductQuery] = useState<number>(-1);
    const [isToastVisible, setIsToastVisible] = useState<boolean>(false);
    const [isToastText, setIsToastText] = useState<string>('');
    const [isToastColor, setToastColor] = useState<string>('');

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
            setIsToastVisible(true);
            setToastColor(SUCCESS);
            setIsToastText('Produit supprimé');
            setTimeout((): void => {
                setIsToastVisible(false);
            }, 2000);
        },
        onError: (): void => {
            setIsModalVisible(false);
            setConfirmationModal(false);
            setCommentValue('');
            setIsToastVisible(true);
            setToastColor(ERROR);
            setIsToastText('Error lors de la suppression du produit');
            setTimeout((): void => {
                setIsToastVisible(false);
            }, 2000);
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
            setIsToastVisible(true);
            setToastColor(SUCCESS);
            setIsToastText('Produit déplacé');
            setTimeout((): void => {
                setIsToastVisible(false);
            }, 2000);
        },
        onError: (): void => {
            setIsModalVisible(false);
            setConfirmationModal(false);
            setCommentValue('');
            setIsToastVisible(true);
            setToastColor(ERROR);
            setIsToastText('Error lors du déplacement du produit');
            setTimeout((): void => {
                setIsToastVisible(false);
            }, 2000);
        }
    });

    function renderToast(): React.ReactElement {
        return (
            <Toast
                visible={isToastVisible}
                hideOnPress={true}
                opacity={1}
                containerStyle={{borderRadius: 5}}
                backgroundColor={isToastColor}
                position={40}
                duration={200}
                shadow={false}
            >
                <Text style={{color: WHITE, fontWeight: 'bold'}}>
                    {isToastText}
                </Text>
            </Toast>
        );
    }

    function getIndexProductQuery(): number {
        if(indexProductQuery !== -1) return indexProductQuery;
        return 0;
    }

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
                    productId={idProductQuery}
                    onDeletePress={(): void => {deleteProductMutation({variables: {id: props.commonProduct.products[getIndexProductQuery()].id, comment: commentValue, user_id: 0}}); }}
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
            {renderToast()}
        </View>
    );
};


export default ProductTable;
