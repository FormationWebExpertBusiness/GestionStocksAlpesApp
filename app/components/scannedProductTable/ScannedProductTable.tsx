import {
    ScrollView,
    Text,
    View
} from 'react-native';
import type {ReactElement} from 'react';
import React, {useState} from 'react';
import {TABLESTYLES} from '../../style/tablesStyle';
import ScannedProductLine from './ScannedProductLine';
import type {ScannedProduct} from '../../types/ScannedProductType';
import DetailProductModal from '../detailProductModal/detailProductModal';
import {GET_PRODUCTS} from '../../graphql/query/getProducts';
import {GET_RACK} from '../../graphql/query/getRack';
import {useMutation} from '@apollo/client';
import {DELETE_PRODUCT} from '../../graphql/mutation/deleteProduct';
import {MOVE_PRODUCT} from '../../graphql/mutation/moveProduct';
import {ERROR, SUCCESS, WHITE} from '../../style/colors';
import Toast from 'react-native-root-toast';

type ScannedProductTableProps = {
    loading: boolean;
    products: ScannedProduct[];
    rack_id: number;
    rack_level: number;
    remove?: boolean;
};

const ScannedProductTable = (props: ScannedProductTableProps): ReactElement => {

    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [commentValue, setCommentValue] = useState<string>('');
    const [idProductQuery, setIdProductQuery] = useState<number>(-1);
    const [indexProductQuery, setIndexProductQuery] = useState<number>(1);
    const [confirmationModal, setConfirmationModal] = useState<boolean>(false);
    const [isToastVisible, setIsToastVisible] = useState<boolean>(false);
    const [isToastText, setIsToastText] = useState<string>('');
    const [isToastColor, setToastColor] = useState<string>('');

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
                setConfirmationModal(false);
                setIsToastVisible(true);
                setIsToastText('Produit supprimé');
                setIsModalVisible(false);
                setToastColor(SUCCESS);
                setTimeout((): void => {
                    setIsToastVisible(false);
                }, 2000);
            },
            onError: (): void => {
                setConfirmationModal(false);
                setIsToastVisible(true);
                setToastColor(ERROR);
                setIsToastText('Erreur lors de la suppression du produit');
                setIsModalVisible(false);
                setTimeout((): void => {
                    setIsToastVisible(false);
                }, 2000);
            }
        });

    const [moveProductMutation, moveProductStatus] = useMutation(MOVE_PRODUCT, {
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
            setConfirmationModal(false);
            setIsToastVisible(true);
            setToastColor(SUCCESS);
            setIsToastText('Produit déplacé');
            setIsModalVisible(false);
            setTimeout((): void => {
                setIsToastVisible(false);
            }, 2000);
        },
        onError: (): void => {
            setConfirmationModal(false);
            setIsToastVisible(true);
            setToastColor(ERROR);
            setIsToastText('Erreur lors du déplacement du produit');
            setIsModalVisible(false);
            setTimeout((): void => {
                setIsToastVisible(false);
            }, 2000);
        }
    });

    function renderToast(): ReactElement {
        return (
            <Toast
                visible={isToastVisible}
                hideOnPress={true}
                opacity={1}
                containerStyle={{borderRadius: 5, zIndex: 200000}}
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

    function renderModal(): ReactElement {
            return (
                <DetailProductModal
                    id={idProductQuery}
                    loading={loading}
                    moveLoading={moveProductStatus.loading}
                    commentValue={commentValue}
                    setCommentValue={setCommentValue}
                    confirmationModal={confirmationModal}
                    productId={idProductQuery}
                    setConfirmationModal={setConfirmationModal}
                    onMovePress={moveProductMutation}
                    closeModal={(): void => {setIsModalVisible(false);}}
                    onDeletePress={(): void => { deleteProductMutation({variables: {id: props.products[indexProductQuery].id, comment: commentValue, user_id: 0}}); }}
                    isVisible={isModalVisible}
                    onBackdropPress={(): void => {setIsModalVisible(false);}}
                    remove
                />
            );
    }

    function renderProducts(): ReactElement[] {
        const SCANNEDPRODUCTSLINES: ReactElement[] = [];

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
            {renderToast()}
        </View>
    );
};


export default ScannedProductTable;
