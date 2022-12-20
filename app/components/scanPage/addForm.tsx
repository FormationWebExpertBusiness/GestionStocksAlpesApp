/* eslint-disable @typescript-eslint/no-explicit-any */
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {useEffect, useRef, useState} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import Modal from 'react-native-modal/dist/modal';
import {ALMOST_BLACK, ALMOST_WHITE, AVERAGE_GREY, BUTTONGREEN, BUTTONGREENDISABLED, BUTTONGREY, BUTTONTEXTDISABLED, DARKBLUEBLACK, RED, TEXTBUTTONGREY, WHITE} from '../../style/colors';
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
import Toast from 'react-native-root-toast';

const STYLES = StyleSheet.create({
    titles: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingBottom: 10,
        justifyContent: 'space-around',
        height: 90,
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
        top: 50,
        width: '98%',
        minHeight: 450,
        paddingHorizontal: 20,
        borderRadius: 10,
        backgroundColor: WHITE,
        shadowColor: DARKBLUEBLACK,
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowOpacity:  0.17,
        shadowRadius: 3.05,
        elevation: 7
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
    buttonAddDisabled: {
        backgroundColor: BUTTONGREENDISABLED,
        borderColor: BUTTONGREENDISABLED
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
    buttonTextDisabled: {
        color: BUTTONTEXTDISABLED,
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
    const [common_id, setCommonId] = useState<number>(-1);
    const [serialNb_error, setSerialNb_error] = useState<number>(0);
    const [price_error, setPrice_error] = useState<number>(0);
    const [commonId_error, setCommonId_error] = useState<number>(0);
    const [commonIdActive, setCommonIdActive] = useState<boolean>(false);
    const [priceActive, setPriceActive] = useState<boolean>(false);
    const [serialNbActive, setSerialNbActive] = useState<boolean>(false);
    const [serialNb_error2, setSerialNb_error2] = useState<number>(1);
    const [price_error2, setPrice_error2] = useState<number>(1);
    const [commonId_error2, setCommonId_error2] = useState<number>(1);


    function isValidFloat(str: string): boolean {
        return /^[+-]?\d+(\.\d+)?$/.test(str);
      }

    function isAlphaNumeric(str: string): boolean {
        return /^[a-zA-Z0-9]+$/.test(str);
      }

    useEffect((): void => {
        if(common_id !== -1) {
            setCommonIdActive(true);
        }
        if(serial_number.length > 0) {
            setSerialNbActive(true);
        }
        if(price.length > 0) {
            setPriceActive(true);
        }
        if(commonIdActive !== false) {
            if(common_id !== -1) {
                setCommonId_error2(0);
                setCommonId_error(0);
            } else {
                setCommonId_error(1);
            }
        }
        if(priceActive !== false) {
            if(isValidFloat(price)) {
                setPrice_error2(0);
                setPrice_error(0);
            } else {
                setPrice_error(1);
            }
        }
        if(serialNbActive !== false) {
            if(isAlphaNumeric(serial_number)) {
                setSerialNb_error2(0);
                setSerialNb_error(0);
            } else {
                setSerialNb_error(1);
            }
        }
    }, [price, serial_number, priceActive, serialNbActive, common_id, commonIdActive]);

    function resetInputs(): void {
        setSerialNumber('');
        setPrice('');
        setComment('');
        setSerialNbActive(false);
        setPriceActive(false);
        setCommonIdActive(false);
        setPrice_error(0);
        setSerialNb_error(0);
        setCommonId_error(0);
        setPrice_error2(1);
        setSerialNb_error2(1);
    }

    function getErrorMsg(): string {
        if(serialNb_error === 1 && price_error === 1) {
            return 'Le numéro de série et le prix sont invalides';
        } else if(serialNb_error === 1) {
            return 'Le numéro de série doit être composé de chiffres et de lettres';
        } else if(price_error === 1) {
            return 'Le prix doit être un nombre';
        }
        return 'Une erreur est survenue';
    }

    function renderToast(): React.ReactElement {
        return (
            <Toast
                visible={serialNb_error === 1 || price_error === 1 || commonId_error === 1}
                hideOnPress={true}
                opacity={1}
                containerStyle={{borderRadius: 5, zIndex: 200000}}
                backgroundColor={RED}
                position={40}
                duration={2000}
                shadow={false}
            >
                <Text style={{color: WHITE, fontWeight: 'bold'}}>
                    {getErrorMsg()}
                </Text>
            </Toast>
        );
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
            commonProductsItems.push({label: 'Chargement...', value: 0});
        } else if(commonProductsData.error) {
            commonProductsItems.push({label: 'Pas de donnée', value: 0});
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
        if(serialNb_error === 1 || price_error === 1 || serialNb_error2 === 1 || price_error2 === 1 || commonId_error === 1 || commonId_error2 === 1) {
            return (
                <View style={STYLES.buttonWrapper}>
                    <Pressable
                        onPress={(): void => { props.onBackdropPress(); }}
                        style={[STYLES.button, STYLES.buttonCancel]}
                    >
                        <Text style={[STYLES.buttonText, {color: TEXTBUTTONGREY}]}>Annuler</Text>
                    </Pressable>
                    <View
                        style={[STYLES.button, STYLES.buttonAddDisabled]}
                    >
                        <Text style={STYLES.buttonTextDisabled}>Ajouter</Text>
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
        style={{alignItems: 'center', zIndex: 5}}
        animationIn="fadeIn"
        onBackdropPress={(): void => {props.onBackdropPress(); resetInputs(); } }
        animationInTiming={10}
        animationOutTiming={10}
        backdropOpacity={0}
        animationOut="fadeOut"
    >
        <Pressable onPress={(): void => {handleFocus();}} style={[STYLES.modalWrapper, {marginTop: 70}]}>
            <Pressable
                onPress={(): void => {props.onBackdropPress(); resetInputs(); }}
                style={STYLES.crossCancel}
            >
                <FontAwesomeIcon color={AVERAGE_GREY} icon={faXmark} size={20} />
            </Pressable>
            <View style={STYLES.titles}>
                <Text style={APPSTYLES.title}>Ajouter un produit</Text>
                <Text style={STYLES.firstTitle}>{props.rackName}</Text>
                <Text style={STYLES.secondTitle}>Étage {props.rackLevel}</Text>
            </View>
            <View style={STYLES.inputs}>
                <View style={STYLES.input}>
                    <CustomDropdownPicker error={commonId_error} onValueChange={(v: number): void => {setCommonId(v);}} multiple={false} placeholder={'Type de produit'} required={true} zindex={1} item={formatCommonProductData()}/>
                </View>
                <View style={STYLES.input}>
                    <CustomTextInput error={serialNb_error} value={serial_number} onValueChange={(text): void => {setSerialNumber(text);}} innerRef={serialNumberRef} placeholder='N° de série' required={true} password={false}/>
                </View>
                <View style={STYLES.input}>
                    <CustomTextInput error={price_error} value={price} onValueChange={(text): void => {setPrice(text);}} innerRef={priceRef} placeholder='Prix' required={true} password={false}/>
                </View>
                <View style={STYLES.input}>
                    <CustomTextInput value={comment} onValueChange={(text): void => {setComment(text);}} innerRef={commentRef} placeholder='Commentaire' required={false} password={false}/>
                </View>
            </View>
            <View style={STYLES.buttonWrapper}>
                {renderButtons()}
            </View>
        </Pressable>
        {renderToast()}
    </Modal>
    );
};

export default AddForm;
