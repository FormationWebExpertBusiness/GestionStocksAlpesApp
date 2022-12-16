import React from 'react';
import {View, StyleSheet, Pressable, Text} from 'react-native';
import {ALMOST_BLACK, ALMOST_WHITE, AVERAGE_GREY, BUTTONGREY, BUTTONRED, CULTURED} from '../../style/colors';
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
        width: 100,
        justifyContent: 'center',
        borderRadius: 5
    },
    buttonDelete: {
        backgroundColor: BUTTONRED
    },
    buttonCancel: {
        backgroundColor: BUTTONGREY
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
        color: ALMOST_WHITE,
        fontWeight: 'bold',
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

const ConfirmationModal = (props: ConfirmationModalProps): React.ReactElement => {

    function renderButtons(): React.ReactElement {
        if(props.loading) {
            return (
                <View style={STYLES.buttonWrapper}>
                    <View style={[STYLES.button, STYLES.buttonCancel]}>
                        <Text style={STYLES.buttonText}>Annuler</Text>
                    </View>
                    <View style={[STYLES.button, STYLES.buttonDelete]}>
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
                    onPress={(): void => { props.onCancelPress(); }}
                    style={[STYLES.button, STYLES.buttonCancel]}
                >
                    <Text style={STYLES.buttonText}>Annuler</Text>
                </Pressable>
                <Pressable
                    onPress={(): void => { props.onConfirmPress(); }}
                    style={[STYLES.button, STYLES.buttonDelete]}
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
                onPress={!props.loading ? props.onCancelPress : (): void => {null;}}
                style={STYLES.crossCancel}
            >
                <FontAwesomeIcon color={AVERAGE_GREY} icon={faXmark} size={17} />
            </Pressable>
            <Text style={STYLES.label}>Êtes-vous sur de vouloir supprimer {'\n'} le produit :</Text>
            <View style={STYLES.productWrapper}>
                <CardConfirmModal content1={props.category} content2={props.brand} title1={'Catégorie'} title2={'Marque'} />
                <CardConfirmModal content2={props.model} content1={props.serial_number} title2={'Modèle'} title1={'N° de série'} />
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
