/* eslint-disable @typescript-eslint/no-explicit-any */
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {useRef, useState} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import Modal from 'react-native-modal/dist/modal';
import {ALMOST_BLACK, ALMOST_WHITE, AVERAGE_GREY, BUTTONGREEN, BUTTONGREY, CULTURED, DARKBLUEBLACK, TEXTBUTTONGREY, WHITE} from '../../style/colors';
import CustomTextInput from '../CustomTextInput';
import LottieView from 'lottie-react-native';
import {faXmark} from '@fortawesome/free-solid-svg-icons/faXmark';
import {ADD_PRODUCT} from '../../graphql/mutation/addProduct';
import {useMutation, useQuery} from '@apollo/client';
import {GET_PRODUCTS} from '../../graphql/query/getProducts';
import {GET_RACK} from '../../graphql/query/getRack';
import LoadingAnimation from '../../assets/loading_6.json';
import {CustomDropdownPicker} from '../CustomDropdownPicker';
import {GET_COMMONPRODUCTS_ADD} from '../../graphql/query/getCommonProductAdd';
import {APPSTYLES} from '../../style/appStyle';

const STYLES = StyleSheet.create({
    titles: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingBottom: 10,
        justifyContent: 'space-around',
        height: 50,
        width: '100%'
    },
    firstTitle: {
        fontSize: 15,
        fontWeight: 'bold',
        color: ALMOST_BLACK
    },
    secondTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: DARKBLUEBLACK,
        opacity: 0.7
    },
    modalWrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingTop: 15,
        width: '98%',
        paddingHorizontal: 20,
        borderRadius: 10,
        backgroundColor: CULTURED
    },
    input: {
        width: '100%'
    },
    button: {
        height: 40,
        alignItems: 'center',
        width: 100,
        borderWidth: 1,
        borderColor: BUTTONGREY,
        color: WHITE,
        justifyContent: 'center',
        borderRadius: 5
    },
    buttonAdd: {
        backgroundColor: BUTTONGREEN,
        borderColor: BUTTONGREEN
    },
    crossCancel: {
        position: 'absolute',
        top: 0,
        right: 0,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        width: 40
    },
    buttonCancel: {
        backgroundColor: WHITE
    },
    buttonText: {
        color: ALMOST_WHITE,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    lottie: {
        height: 70,
        width: 70,
        fontSize: 40
    },
    buttonWrapper: {
        display: 'flex',
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%'
    },
    inputs: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
        height: 280,
        width: '100%'
    }
});

type AddFormProps = {
    onBackdropPress(): void;
    isVisible: boolean;
    rackName: string;
    rackId: number;
    rackLevel: number;
};

const AddForm = (props: AddFormProps): React.ReactElement => {

    const serialNumberRef = useRef<any>(null);
    const priceRef = useRef<any>(null);
    const commentRef = useRef<any>(null);

    const [serial_number, setSerialNumber] = useState<string>('');
    const [price, setPrice] = useState<string>('');
    const [comment, setComment] = useState<string>('');
    const [common_id, setCommonId] = useState<number>();

    function resetInputs(): void {
        setSerialNumber('');
        setPrice('');
        setComment('');
    }

    const commonProductsData = useQuery(GET_COMMONPRODUCTS_ADD, {
        fetchPolicy: 'network-only'
    });

    const [addProductMutation, {loading}] = useMutation(ADD_PRODUCT, {
        awaitRefetchQueries: true,
        refetchQueries: [
            {
                query: GET_PRODUCTS,
                fetchPolicy: 'network-only',
                variables: {
                    rack_id: props.rackId,
                    rack_level: props.rackLevel
                }
            },
            {
                query: GET_RACK,
                fetchPolicy: 'network-only',
                variables: {
                    id: props.rackId,
                    level: props.rackLevel
                }
            }
        ],
        onCompleted: (): void => {
            props.onBackdropPress();
            resetInputs();
        }
    });

    function formatCommonProductData(): {label: string; value: number;}[] {
        const commonProductsItems: {label: string; value: number;}[] = [];
        if(commonProductsData.data !== undefined) {
            commonProductsData.data.commonProducts.forEach((commonProduct: any): void => {
                const category = commonProduct.category.name;
                const model = commonProduct.model;

                commonProductsItems.push({
                    label: `${category} ${model}`,
                    value: commonProduct.id
                });
            });
        } else if(commonProductsData.loading) {
            commonProductsItems.push({label: 'Loading...', value: 0});
        } else if(commonProductsData.error) {
            commonProductsItems.push({label: 'No data', value: 0});
        }
        return commonProductsItems;
    }


    function handleFocus(): void {
        serialNumberRef.current.blur();
        priceRef.current.blur();
        commentRef.current.blur();
    }

    function renderButtons(): React.ReactElement {
        if(loading) {
            return (
                <View style={STYLES.buttonWrapper}>
                    <View style={[STYLES.button, STYLES.buttonCancel]}>
                        <Text style={[STYLES.buttonText, {color: TEXTBUTTONGREY}]}>Annuler</Text>
                    </View>
                    <View style={[STYLES.button, STYLES.buttonAdd]}>
                        <LottieView
                            style={STYLES.lottie}
                            source={LoadingAnimation}
                            autoPlay
                            autoSize
                            loop
                        />
                    </View>
                </View>
            );
        }
        return (
            <View style={STYLES.buttonWrapper}>
                <Pressable
                    onPress={(): void => { props.onBackdropPress(); }}
                    style={[STYLES.button, STYLES.buttonCancel]}
                >
                    <Text style={[STYLES.buttonText, {color: TEXTBUTTONGREY}]}>Annuler</Text>
                </Pressable>
                <Pressable
                    onPress={(): void => {
                        handleFocus();
                        addProductMutation({variables: {
                            common_id,
                            user_id: 0,
                            rack_id: props.rackId,
                            rack_level: props.rackLevel,
                            serial_number,
                            price: parseFloat(price),
                            comment
                        }});
                    }}
                    style={[STYLES.button, STYLES.buttonAdd]}
                >
                    <Text style={STYLES.buttonText}>Ajouter</Text>
                </Pressable>
            </View>
        );
    }

    return (
        <Modal
        isVisible={props.isVisible}
        style={{alignItems: 'center'}}
        animationIn="fadeIn"
        onBackdropPress={(): void => {props.onBackdropPress(); resetInputs(); } }
        animationInTiming={10}
        animationOutTiming={10}
        animationOut="fadeOut"
    >
        <Pressable onPress={(): void => {handleFocus();}} style={[STYLES.modalWrapper, {marginTop: 70}]}>
            <Pressable
                onPress={(): void => {props.onBackdropPress(); resetInputs(); }}
                style={STYLES.crossCancel}
            >
                <FontAwesomeIcon color={AVERAGE_GREY} icon={faXmark} size={20} />
            </Pressable>
            <Text style={APPSTYLES.title}>Ajouter un produit</Text>
            <View style={STYLES.titles}>
                <Text style={STYLES.firstTitle}>{props.rackName}</Text>
                <Text style={STYLES.secondTitle}>Étage {props.rackLevel}</Text>
            </View>
            <View style={STYLES.inputs}>
                <View style={STYLES.input}>
                    {/* <CustomTextInput value={common_id} onValueChange={(text): void => {setCommonId(text);}} innerRef={commonIdRef} placeholder='ID Type de produit' required={true} password={false}/> */}
                    <CustomDropdownPicker onValueChange={(v: number): void => {setCommonId(v);}} multiple={false} placeholder={'Type de produit'} required={true} zindex={1} item={formatCommonProductData()}/>
                </View>
                <View style={STYLES.input}>
                    <CustomTextInput value={serial_number} onValueChange={(text): void => {setSerialNumber(text);}} innerRef={serialNumberRef} placeholder='N° de série' required={true} password={false}/>
                </View>
                <View style={STYLES.input}>
                    <CustomTextInput value={price} onValueChange={(text): void => {setPrice(text);}} innerRef={priceRef} placeholder='Prix' required={true} password={false}/>
                </View>
                <View style={STYLES.input}>
                    <CustomTextInput value={comment} onValueChange={(text): void => {setComment(text);}} innerRef={commentRef} placeholder='Commentaire' required={false} password={false}/>
                </View>
            </View>
            <View style={STYLES.buttonWrapper}>
                {renderButtons()}
            </View>
        </Pressable>
    </Modal>
    );
};

export default AddForm;
