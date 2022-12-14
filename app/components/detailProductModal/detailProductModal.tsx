import {View, Text, Pressable, Image} from 'react-native';
import type {ReactElement} from 'react';
import React, {useState} from 'react';
import {AVERAGE_GREY, BLACK, BUTTONPURPLE, BUTTONPURPLEDISABLED, BUTTONPURPLEPRESSED, BUTTONRED, BUTTONREDDISABLED, BUTTONREDPRESSED, CULTURED, ERROR, RED, WHITE} from '../../style/colors';
import Modal from 'react-native-modal/dist/modal';
import CardModal from './cardModal';
import LottieView from 'lottie-react-native';
import {GET_PRODUCT_MODAL_DATA} from '../../graphql/query/getProductModalData';
import {useQuery} from '@apollo/client';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faXmark} from '@fortawesome/free-solid-svg-icons/faXmark';
import LoadingAnimation from '../../assets/loading_6.json';
import ConfirmationModal from './confirmationModal';
import QRCodeScanner from 'react-native-qrcode-scanner';
import qrCodeScannerImg from '../../assets/qrCodeScannerImg.png';
import {faLightbulb as faLightbulbOn} from '@fortawesome/free-solid-svg-icons/faLightbulb';
import {faLightbulb as faLightbulbOff} from '@fortawesome/free-regular-svg-icons/faLightbulb';
import {RNCamera} from 'react-native-camera';
import Toast from 'react-native-root-toast';
import {DETAIL_MODAL_STYLES, QRCODE_STYLES} from '../../style/detailProductModalStyle';

type dataMoveMutation = {
    variables: {
        id: number;
        rack_id: number;
        rack_level: number;
        user_id: number;
    };
};

type DetailProductModalProps = {
    id: number;
    isVisible: boolean;
    onDeletePress?(): void;
    onMovePress?(data: dataMoveMutation): void;
    moveLoading?: boolean;
    loading?: boolean;
    productId: number | null;
    onBackdropPress(): void;
    commentValue: string;
    setCommentValue(value: string): void;
    confirmationModal: boolean;
    setConfirmationModal(arg0: boolean): void;
    closeModal(): void;
    remove?: boolean;
};

const DetailProductModal = (props: DetailProductModalProps): ReactElement => {

    const [isLightOn, setIsLightOn] = useState(RNCamera.Constants.FlashMode.off);
    const [lightIcon, setLightIcon] = useState(faLightbulbOff);
    const [errorStatus, setErrorStatus] = useState(false);
    const [lightFeedback, setLightFeedback] = useState(`${BLACK}00`);
    const [isScanner, setIsScanner] = useState<'flex' | 'none'>('none');
    const [isToastVisible, setIsToastVisible] = useState<boolean>(false);
    const [isToastText, setIsToastText] = useState<string>('');
    const [isToastColor, setToastColor] = useState<string>('');
    const [moveButtonColor, setMoveButtonColor] = useState<string>(BUTTONPURPLE);
    const [removeButtonColor, setRemoveButtonColor] = useState<string>(BUTTONRED);

    const productModalData = useQuery(GET_PRODUCT_MODAL_DATA, {
        fetchPolicy: 'network-only',
        variables: {
            product_id: props.id
        },
        onError: (): void => {
            setIsToastVisible(true);
            setToastColor(ERROR);
            setIsToastText('Une erreur est survenue');
            setTimeout((): void => {
                setIsToastVisible(false);
            }, 2000);
        }
    });

    function renderButtons(): ReactElement {
        if(props.remove) {
            if(props.loading) {
                return (
                    <View style={DETAIL_MODAL_STYLES.buttonWrapper}>
                        <View
                            style={[DETAIL_MODAL_STYLES.button, {backgroundColor: BUTTONPURPLEDISABLED, borderColor: BUTTONPURPLEDISABLED}]}
                        >
                            <Text style={DETAIL_MODAL_STYLES.buttonText}>D??placer</Text>
                        </View>
                        <View
                            style={[DETAIL_MODAL_STYLES.button, {backgroundColor: BUTTONRED, borderColor: BUTTONRED}]}
                        >
                            <LottieView
                                style={DETAIL_MODAL_STYLES.lottie}
                                source={LoadingAnimation}
                                autoPlay
                                autoSize
                                loop
                            />
                        </View>
                    </View>
                );
            } else if(props.moveLoading) {
                return (
                    <View style={DETAIL_MODAL_STYLES.buttonWrapper}>
                        <View
                            style={[DETAIL_MODAL_STYLES.button, {backgroundColor: BUTTONPURPLE, borderColor: BUTTONPURPLE}]}
                        >
                            <LottieView
                                style={DETAIL_MODAL_STYLES.lottie}
                                source={LoadingAnimation}
                                autoPlay
                                autoSize
                                loop
                            />
                        </View>
                        <View
                            style={[DETAIL_MODAL_STYLES.button, {backgroundColor: BUTTONREDDISABLED, borderColor: BUTTONREDDISABLED}]}
                        >
                            <Text style={DETAIL_MODAL_STYLES.buttonText}>Supprimer</Text>
                        </View>
                    </View>
                );
            }
            return (
                <View style={DETAIL_MODAL_STYLES.buttonWrapper}>
                    <Pressable
                        onPress={(): void => { setIsScanner('flex'); }}
                        style={[DETAIL_MODAL_STYLES.button, {backgroundColor: moveButtonColor, borderColor: moveButtonColor}]}
                        onPressIn={(): void => { setMoveButtonColor(BUTTONPURPLEPRESSED); }}
                        onPressOut={(): void => { setMoveButtonColor(BUTTONPURPLE); }}
                    >
                        <Text style={DETAIL_MODAL_STYLES.buttonText}>D??placer</Text>
                    </Pressable>
                    <Pressable
                        onPress={(): void => { props.setConfirmationModal(true); }}
                        style={[DETAIL_MODAL_STYLES.button, {backgroundColor: removeButtonColor, borderColor: removeButtonColor}]}
                        onPressIn={(): void => { setRemoveButtonColor(BUTTONREDPRESSED); }}
                        onPressOut={(): void => { setRemoveButtonColor(BUTTONRED); }}
                    >
                        <Text style={DETAIL_MODAL_STYLES.buttonText}>Supprimer</Text>
                    </Pressable>
                </View>
            );
        }
        return <View />;
    }

    function renderToast(): ReactElement {
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

    function checkQrCodeData(data: string): void {
        let resData: {rack_id: number; rack_level: number;};
        try {
            resData = JSON.parse(data);
            setIsScanner('none');

            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            props.onMovePress?.({variables: {id: props.productId!, rack_id: resData.rack_id, rack_level: resData.rack_level, user_id: 0}});
            setErrorStatus(false);
        } catch (error) {
            setErrorStatus(true);
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onSuccess = (e: any): void => {
        checkQrCodeData(e.data);
    };

    function switchLightMode(): void {
        setIsLightOn(isLightOn === RNCamera.Constants.FlashMode.off ? RNCamera.Constants.FlashMode.torch : RNCamera.Constants.FlashMode.off);
    }



    function switchLightIcon(): void {
        if(isLightOn === RNCamera.Constants.FlashMode.off) {
            setLightIcon(faLightbulbOn);
        } else {
            setLightIcon(faLightbulbOff);
        }
    }

    function switchLight(): void {
        switchLightIcon();
        switchLightMode();
    }

    function renderQrCodeScanner(): ReactElement {
        return (
            <View style={{display: isScanner}}>
                <QRCodeScanner
                    showMarker={false}
                    reactivate={true}
                    vibrate={true}
                    reactivateTimeout={3000}
                    onRead={onSuccess}
                    flashMode={isLightOn}
                    markerStyle={{borderColor: CULTURED, borderRadius: 15, borderWidth: 10, height: 200, width: 200}}
                    containerStyle={QRCODE_STYLES.pageWrapper}
                    cameraStyle={{height: '100%'}}
                    bottomContent={
                        <View style={QRCODE_STYLES.bottomWrapper}>
                            <Toast
                                    hideOnPress={false}
                                    visible={errorStatus}
                                    backgroundColor={RED}
                                    position={50}
                                    shadow={false}
                                    animation={false}
                                >
                                    <Text>Le QR code n'est pas valide</Text>
                                </Toast>
                                <View style={QRCODE_STYLES.imgWrapper}>
                                    <Image
                                        style={{height: 250, width: 250}}
                                        source={qrCodeScannerImg}
                                    />
                                </View>
                            <Pressable onPressOut={(): void => {setLightFeedback(`${BLACK}00`);}} onPressIn={(): void => {setLightFeedback(BLACK);}} onPress={(): void => {switchLight();}} style={[QRCODE_STYLES.iconWrapper, {backgroundColor: lightFeedback}]}>
                                <FontAwesomeIcon icon={lightIcon} size={30} color={WHITE} />
                            </Pressable>
                        </View>
                    }
                />
            </View>
        );
    }

    function renderContent(type: 'data' | 'skeleton'): ReactElement {

        if(type === 'data') {
            const {serial_number, model, category, brand, rack_level, rack, created_at} = productModalData.data.product;

            return (
                <>
                    <CardModal
                        title1={'N?? s??rie'}
                        title2={'Mod??le'}
                        content1={serial_number}
                        content2={model}
                        label={'Produit'}
                    />
                    <CardModal
                        title1={'Cat??gorie'}
                        title2={'Marque'}
                        content1={category.name}
                        content2={brand.name}
                        label={'Type de produit'}
                    />
                    <CardModal
                        title1={'??tag??re'}
                        title2={'??tage'}
                        content2={rack.name}
                        content1={rack_level.toString()}
                        label={'Position'}
                    />
                    <CardModal
                        title1={'Date'}
                        title2={'Heure'}
                        content1={created_at.split(/(\s+)/)[2]}
                        content2={created_at.split(/(\s+)/)[0]}
                        label={'Entr??e en stock'}
                    />
                </>
            );
        }
        return (
            <>
                <CardModal
                    title1={'N?? s??rie'}
                    title2={'Mod??le'}
                    skeleton={true}
                    label={'Produit'}
                />
                <CardModal
                    title1={'Cat??gorie'}
                    title2={'Marque'}
                    skeleton={true}
                    label={'Type de produit'}
                />
                <CardModal
                    title1={'??tag??re'}
                    title2={'??tage'}
                    skeleton={true}
                    label={'Position'}
                />
                <CardModal
                    title1={'Date'}
                    title2={'Heure'}
                    skeleton={true}
                    label={'Entr??e en stock'}
                />
            </>
        );

    }

    function renderCards(): ReactElement {

        if(productModalData.loading) {
            return (
                <>
                    {renderContent('skeleton')}
                </>
            );
        } else if(productModalData.error) {
            return <View>
                <Text style={DETAIL_MODAL_STYLES.textStyle}>{productModalData.error.message}</Text>
                </View>;
        }

        return (
            <>
                {renderContent('data')}
            </>
        );
    }

    return (
        <Modal
            isVisible={props.isVisible}
            style={{alignItems: 'center'}}
            onBackButtonPress={!props.loading ? (): void => {if(isScanner === 'flex') setIsScanner('none'); else props.onBackdropPress();} : (): void => {null;}}
            animationIn="fadeIn"
            animationInTiming={10}
            animationOutTiming={10}
            animationOut="fadeOut"
            onBackdropPress={!props.loading ? props.onBackdropPress : (): void => {null;}}
        >
            <View style={DETAIL_MODAL_STYLES.modalWrapper}>
                <Pressable
                    onPress={props.onBackdropPress}
                    style={DETAIL_MODAL_STYLES.buttonCancel}
                >
                    <FontAwesomeIcon color={AVERAGE_GREY} icon={faXmark} size={20} />
                </Pressable>
                {renderCards()}
                {renderButtons()}
            </View>
            <ConfirmationModal
                isVisible={props.confirmationModal}
                commentValue={props.commentValue}
                setCommentValue={props.setCommentValue}
                onCancelPress={(): void => {props.setConfirmationModal(false);}}
                onConfirmPress={(): void => {props.onDeletePress?.();}}
                category={productModalData.data?.product.category.name}
                brand={productModalData.data?.product.brand.name}
                loading={props.loading}
                model={productModalData.data?.product.model}
                serial_number={productModalData.data?.product.serial_number}
            />
            {renderQrCodeScanner()}
            {renderToast()}
        </Modal>
    );
};


export default DetailProductModal;
