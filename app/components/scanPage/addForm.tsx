import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import type {ReactElement} from 'react';
import {useRef, useState} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import Modal from 'react-native-modal/dist/modal';
import {ALMOST_BLACK, ALMOST_WHITE, AVERAGE_GREY, BUTTONGREEN, BUTTONGREY, DARKBLUEBLACK, ERROR, TEXTBUTTONGREY, WHITE} from '../../style/colors';
import CustomTextInput from '../CustomTextInput';
import LottieView from 'lottie-react-native';
import {faXmark} from '@fortawesome/free-solid-svg-icons/faXmark';
import LoadingAnimation from '../../assets/loading_6.json';
import {CustomDropdownPicker} from '../CustomDropdownPicker';
import {GET_COMMONPRODUCTS_ADD} from '../../graphql/query/getCommonProductAdd';
import {APPSTYLES} from '../../style/appStyle';
import Toast from 'react-native-root-toast';
import {useQuery} from '@apollo/client';
import type {CommonProduct} from '../../types/commonProductType';
import {Controller, useForm} from 'react-hook-form';

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
        width: '98%',
        minHeight: 500,
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
        height: 320,
        width: '100%'
    },
    errorText: {
        color: ERROR,
        fontSize: 12,
        paddingBottom: 10,
        justifyContent: 'center',
        fontWeight: 'bold',
        textAlign: 'center'
    }
});

type AddMutationType = {
    variables: {
        common_id: number;
        user_id: number;
        rack_id: number;
        rack_level: number;
        serial_number: string;
        price: number;
        comment: string;
    };
};

type AddFormProps = {
    onBackdropPress(): void;
    isVisible: boolean;
    rackName: string;
    complete: boolean;
    onAddPress(variables: AddMutationType): void;
    loading: boolean;
    rackId: number;
    rackLevel: number;
};

const AddForm = (props: AddFormProps): ReactElement => {

    const [isToastVisible, setIsToastVisible] = useState<boolean>(false);
    const [isToastText, setIsToastText] = useState<string>('');
    const [isToastColor, setToastColor] = useState<string>('');

        /* eslint-disable @typescript-eslint/no-explicit-any */
        const serialNumberRef = useRef<any>(null);
        const priceRef = useRef<any>(null);
        const commentRef = useRef<any>(null);
        /* eslint-enable @typescript-eslint/no-explicit-any */

        function handleFocus(): void {
            serialNumberRef.current.blur();
            priceRef.current.blur();
            commentRef.current.blur();
        }

        const {
            control,
            register,
            handleSubmit,
            clearErrors,
            reset,
            formState: {errors}
        } = useForm({mode: 'onBlur'});

        function resetInputs(): void {
            clearErrors();
            reset();
        }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onSubmit = (data: any): void => {
        handleFocus();
        console.log(data);
        const {SerialNb, Price, Comment, CommonId} = data;
        console.log(data);

        props.onAddPress({variables: {
            common_id: CommonId,
            user_id: 0,
            rack_id: props.rackId,
            rack_level: props.rackLevel,
            serial_number: SerialNb,
            price: parseFloat(Price),
            comment: Comment
        }});
        resetInputs();
    };

    const commonProductsData = useQuery(GET_COMMONPRODUCTS_ADD, {
        fetchPolicy: 'network-only',
        onError: (): void => {
            setIsToastVisible(true);
            setToastColor(ERROR);
            setIsToastText('Une erreur est survenue');
            setTimeout((): void => {
                setIsToastVisible(false);
            }, 2000);
        }
    });

    function renderErrorToast(): ReactElement {
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

    function formatCommonProductData(): {label: string; value: number;}[] {
        const commonProductsItems: {label: string; value: number;}[] = [];
        if(commonProductsData.data !== undefined) {
            commonProductsData.data.commonProducts.forEach((commonProduct: CommonProduct): void => {
                const category = commonProduct.category.name;
                const model = commonProduct.model;

                commonProductsItems.push({
                    label: `${category} ${model}`,
                    value: commonProduct.id
                });
            });
        } else if(commonProductsData.error) {
            commonProductsItems.push({label: 'Pas de donnée', value: 0});
        }
        return commonProductsItems;
    }

    function renderButtons(): ReactElement {
        if(props.loading) {
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
                    onPress={handleSubmit(onSubmit)}
                    style={[STYLES.button, STYLES.buttonAdd]}
                >
                    <Text style={[STYLES.buttonText, {color: WHITE}]}>Ajouter</Text>
                </Pressable>
            </View>
        );
    }

    function getCommonIdError(): ReactElement {
        if(errors.CommonId) {
            return (
                <Text style={STYLES.errorText}>
                    {errors.CommonId.message?.toString()}
                </Text>
            );
        }
        return (
            <Text style={STYLES.errorText}>
                &nbsp;
            </Text>
        );
    }

    function getPriceError(): ReactElement {
        if(errors.Price) {
            return (
                <Text style={STYLES.errorText}>
                    {errors.Price.message?.toString()}
                </Text>
            );
        }
        return (
            <Text style={STYLES.errorText}>
                &nbsp;
            </Text>
        );
    }

    function getSerialNbError(): ReactElement {
        if(errors.SerialNb) {
            return (
                <Text style={STYLES.errorText}>
                    {errors.SerialNb.message?.toString()}
                </Text>
            );
        }
        return (
            <Text style={STYLES.errorText}>
                &nbsp;
            </Text>
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
                <Controller
                    control={control}
                    {...register('CommonId')}
                    render={({field: {onChange}}): ReactElement => {
                        return (
                            <View style={STYLES.input}>
                                <CustomDropdownPicker
                                    required={true}
                                    placeholder="Type de produit"
                                    error={errors.CommonId ? 1 : 0}
                                    multiple={false}
                                    zindex={1}
                                    item={formatCommonProductData()}
                                    onValueChange={(val: number): void => {onChange(val);}}
                                />
                            </View>
                        );
                    }}
                    rules={{
                        required: {
                            value: true,
                            message: 'Le type de produit ne peux pas être vide !'
                        }
                    }}
                />
                {getCommonIdError()}
                <Controller
                    control={control}
                    {...register('Price')}
                    render={({field: {onChange, value}}): ReactElement => {
                        return (
                            <View style={STYLES.input}>
                                <CustomTextInput
                                    password={false}
                                    required={true}
                                    keyboardType="numeric"
                                    innerRef={priceRef}
                                    placeholder="Prix"
                                    error={errors.Price ? 1 : 0}
                                    value={value}
                                    onValueChange={(val: string): void => {onChange(val);}}
                                />
                            </View>
                        );
                    }}
                    rules={{
                        required: {
                            value: true,
                            message: 'Le prix ne peux pas être vide !'
                        },
                        pattern: {
                            value: /^[+-]?\d+(\.\d+)?$/,
                            message: 'Le prix doit être composé de chiffre !'
                        }
                    }}
                />
                {getPriceError()}
                <Controller
                    control={control}
                    {...register('SerialNb')}
                    render={({field: {onChange, value}}): ReactElement => {
                        return (
                            <View style={STYLES.input}>
                                <CustomTextInput
                                    password={false}
                                    required={true}
                                    innerRef={serialNumberRef}
                                    placeholder="N° de série"
                                    error={errors.SerialNb ? 1 : 0}
                                    value={value}
                                    onValueChange={(val: string): void => {onChange(val);}}
                                />
                            </View>
                        );
                    }}
                    rules={{
                        required: {
                            value: true,
                            message: 'Le N° de série ne peux pas être vide !'
                        },
                        pattern: {
                            value: /^[a-zA-Z0-9]+$/,
                            message: 'Le N° de série doit être composé de chiffre et de lettres !'
                        }
                    }}
                />
                {getSerialNbError()}
                <Controller
                    control={control}
                    {...register('Comment')}
                    render={({field: {onChange, value}}): ReactElement => {
                        return (
                            <View style={STYLES.input}>
                                <CustomTextInput
                                    password={false}
                                    required={false}
                                    innerRef={commentRef}
                                    placeholder="Commentaire"
                                    value={value}
                                    onValueChange={(val: string): void => {onChange(val);}}
                                />
                            </View>
                        );
                    }}
                />
            </View>
            <View style={STYLES.buttonWrapper}>
                {renderButtons()}
            </View>
        </Pressable>
        {renderErrorToast()}
    </Modal>
    );
};

export default AddForm;
