import type {ReactElement} from 'react';
import React from 'react';
import {View, StyleSheet, Pressable, Text} from 'react-native';
import {ALMOST_BLACK, ALMOST_WHITE, AVERAGE_GREY, BUTTONGREY, BUTTONRED, BUTTONREDPRESSED, BUTTONWHITEDISABLED, BUTTONWHITEPRESSED, CULTURED, TEXTBUTTONGREY, WHITE} from '../../style/colors';
import Modal from 'react-native-modal/dist/modal';
import LottieView from 'lottie-react-native';
import LoadingAnimation from '../../assets/loading_6.json';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faXmark} from '@fortawesome/free-solid-svg-icons';
import CustomTextInput from '../CustomTextInput';
import CardConfirmModal from './cardConfirmModal';

type ConfirmationModalProps = {
    onConfirmPress(): void;
    onCancelPress(): void;
    loading?: boolean;
    category: string;
    brand: string;
    commentValue: string;
    setCommentValue(value: string): void;
    model: string;
    serial_number: string;
    isVisible: boolean;
};

const STYLES = StyleSheet.create({
    modalWrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
        height: 420,
        width: '90%',
        paddingTop: 40,
        paddingHorizontal: 20,
        borderRadius: 5,
        backgroundColor: CULTURED
    },
    button: {
        height: 40,
        marginTop: 10,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: BUTTONGREY,
        width: 100,
        justifyContent: 'center',
        borderRadius: 5
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
    buttonText: {
        fontWeight: 'bold',
        color: ALMOST_WHITE,
        textAlign: 'center'
    },
    textStyle: {
        color: ALMOST_BLACK,
        textAlign: 'center'
    },
    label: {
        color: ALMOST_BLACK,
        fontWeight: 'bold',
        fontSize: 15,
        textAlign: 'center'
    },
    boldTextStyle: {
        color: ALMOST_BLACK,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    lottie: {
        height: 70,
        width: 70,
        fontSize: 40
    },
    input: {
        width: '100%'
    },
    textWrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    },
    buttonWrapper: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%'
    },
    productWrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '100%',
        height: 150
    }
});

const ConfirmationModal = (props: ConfirmationModalProps): ReactElement => {

    const [cancelButtonColor, setCancelButtonColor] = React.useState<string>(WHITE);
    const [deleteButtonColor, setDeleteButtonColor] = React.useState<string>(BUTTONRED);

    function renderButtons(): ReactElement {
        if(props.loading) {
            return (
                <View style={STYLES.buttonWrapper}>
                    <View style={[STYLES.button, {backgroundColor: BUTTONWHITEDISABLED}]}>
                        <Text style={[STYLES.buttonText, {color: TEXTBUTTONGREY}]}>Annuler</Text>
                    </View>
                    <View style={[STYLES.button, {backgroundColor: BUTTONRED}]}>
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
                    onPress={(): void => { props.onCancelPress(); props.setCommentValue(''); }}
                    style={[STYLES.button, {backgroundColor: cancelButtonColor}]}
                    onPressIn={(): void => { setCancelButtonColor(BUTTONWHITEPRESSED); }}
                    onPressOut={(): void => { setCancelButtonColor(WHITE); }}
                >
                    <Text style={[STYLES.buttonText, {color: TEXTBUTTONGREY}]}>Annuler</Text>
                </Pressable>
                <Pressable
                    onPress={(): void => { props.onConfirmPress(); }}
                    style={[STYLES.button, {backgroundColor: deleteButtonColor, borderColor: deleteButtonColor}]}
                    onPressIn={(): void => { setDeleteButtonColor(BUTTONREDPRESSED); }}
                    onPressOut={(): void => { setDeleteButtonColor(BUTTONRED); }}
                >
                    <Text style={STYLES.buttonText}>Supprimer</Text>
                </Pressable>
            </View>
        );
    }

    return (
        <Modal
        isVisible={props.isVisible}
        style={{alignItems: 'center'}}
        animationIn="fadeIn"
        animationInTiming={10}
        animationOutTiming={10}
        animationOut="fadeOut"
        onBackdropPress={!props.loading ? props.onCancelPress : (): void => {null;}}
    >
        <View style={STYLES.modalWrapper}>
            <Pressable
                onPress={!props.loading ? (): void => {props.onCancelPress(); props.setCommentValue('');} : (): void => {null;}}
                style={STYLES.crossCancel}
            >
                <FontAwesomeIcon color={AVERAGE_GREY} icon={faXmark} size={17} />
            </Pressable>
            <Text style={STYLES.label}>Êtes-vous sur de vouloir supprimer {'\n'} le produit :</Text>
            <View style={STYLES.productWrapper}>
                <CardConfirmModal content2={props.model} content1={props.serial_number} title2={'Modèle'} title1={'N° de série'} />
                <CardConfirmModal content2={props.category} content1={props.brand} title2={'Catégorie'} title1={'Marque'} />
            </View>
            <View style={STYLES.input}>
                <CustomTextInput value={props.commentValue} onValueChange={(text): void => {props.setCommentValue(text);}} placeholder='Commentaire' required={false} password={false}/>
            </View>
            {renderButtons()}
        </View>
    </Modal>
    );
};

export default ConfirmationModal;
