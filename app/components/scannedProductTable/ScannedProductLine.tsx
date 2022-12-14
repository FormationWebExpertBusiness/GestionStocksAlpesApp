/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
    View,
    Text,
    Pressable
} from 'react-native';
import React, {useState} from 'react';
import {ALMOST_BLACK, BUTTONRED} from '../../style/colors';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons/faMagnifyingGlass';
import {faXmark} from '@fortawesome/free-solid-svg-icons/faXmark';
import {useMutation} from '@apollo/client';
import {LINESTYLES} from '../../style/tablesStyle';
import DetailProductModal from '../detailProductModal/detailProductModal';
import {GET_RACK} from '../../graphql/query/getRack';
import {GET_PRODUCTS} from '../../graphql/query/getProducts';
import {DELETE_PRODUCT} from '../../graphql/mutation/deleteProduct';

type ScannedProductLineProps = {
    id: number;
    keyI?: number;
    head?: boolean;
    created_at?: string;
    rack_id?: number;
    rack_level?: number;
    serialNumber: string;
    model: string;
    brand?: string;
    category: string;
    remove?: boolean;
};

const ScannedProductLine = (props: ScannedProductLineProps): React.ReactElement => {

    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [deleteProductMutation, {data, loading, error}] = useMutation(DELETE_PRODUCT, {
        awaitRefetchQueries: true,
        refetchQueries: [
            {
                query: GET_PRODUCTS,
                fetchPolicy: 'no-cache',
                variables: {
                    rack_id: props.rack_id,
                    rack_level: props.rack_level
                }
            },
            {
                query: GET_RACK,
                fetchPolicy: 'no-cache',
                variables: {
                    id: props.rack_id,
                    level: props.rack_level
                }
            }
        ]
    });

    function getWrapperStyle(): object {
        if(props.head) {
            return LINESTYLES.headWrapper;
        }

        return props.keyI! % 2 === 0 ? LINESTYLES.evenWrapper : LINESTYLES.oddWrapper;
    }

    const [productStyle, setProductStyle] = useState<object>(getWrapperStyle());


    getWrapperStyle();

    function getIcon(): React.ReactElement {
        if(props.head) {
            return <View />;
        }
        if(props.remove) {
            return (
                <View style={[LINESTYLES.icon, LINESTYLES.iconDeletion]}>
                    <FontAwesomeIcon color={BUTTONRED} icon={faXmark} size={15} />
                </View>
            );
        }
        return (
            <View style={LINESTYLES.icon}>
                <FontAwesomeIcon color={ALMOST_BLACK} icon={faMagnifyingGlass} size={12} />
            </View>
        );
    }

    function renderModal(): React.ReactElement {
        if(!props.head) {
            return <DetailProductModal
                onDeletePress={(): void => { deleteProductMutation({variables: {id: props.id}}); }}
                remove={props.remove}
                isVisible={isModalVisible}
                onBackdropPress={(): void => { setIsModalVisible(false); }}
                created_at={props.created_at!}
                serialNumber={props.serialNumber}
                model={props.model}
                brand={props.brand!}
                category={props.category}
                rackId={props.rack_id!}
                rackLevel={props.rack_level!}
            />;
        }
        return <View />;
    }

    function renderContent(): React.ReactElement {
        if(loading) {
            return <Text style={[LINESTYLES.text, LINESTYLES.textLoading]}>Suppression...</Text>;
        }
        return (
            <>
                <Text style={LINESTYLES.text} numberOfLines={1}>{props.category}</Text>
                <Text style={LINESTYLES.text} numberOfLines={1}>{props.model}</Text>
                <Text style={LINESTYLES.text} numberOfLines={1}>{props.serialNumber}</Text>
                {getIcon()}
            </>
        );
    }



    return (
        <View>
            <Pressable
                style={[LINESTYLES.wrapper, productStyle]}
                onPressOut={(): void => { setProductStyle(getWrapperStyle()); }}
                onPressIn={(): void => { if(!props.head)setProductStyle(LINESTYLES.activeProduct); }}
                onPress={(): void => { setIsModalVisible(true); }}
            >
                {renderContent()}
            </Pressable>
            {renderModal()}
        </View>
    );
};


export default ScannedProductLine;
