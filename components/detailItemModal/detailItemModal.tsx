import {
    View,
    StyleSheet,
    Text,
    Pressable
} from 'react-native';
import React from 'react';
import {ALMOST_BLACK, ALMOST_WHITE, BUTTONGREY, BUTTONRED, CULTURED, DARKBLUEBLACK} from '../../style/colors';
import Modal from 'react-native-modal/dist/modal';
import CardModal from './cardModal';

const STYLES = StyleSheet.create({
    modalWrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
        height: '70%',
        width: '90%',
        paddingTop: 0,
        paddingBottom: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        backgroundColor: CULTURED
    },
    textStyle: {
        width: '50%',
        color: ALMOST_BLACK,
        textAlign: 'center'
    },
    componentWrapper: {
        display: 'flex',
        flexDirection: 'column',
        padding: 10,
        borderRadius: 5,
        backgroundColor: CULTURED,
        shadowColor: DARKBLUEBLACK,
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowOpacity: 0.16,
        shadowRadius: 1.51,
        elevation: 2
    },
    textContent: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between'
    },
    headerWrapper: {
        flexDirection: 'row',
        opacity: 0.4,
        width: '100%',
        justifyContent: 'space-between'
    },
    contentWrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    buttonWrapper: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between'
    },
    button: {
        height: 40,
        marginTop: 20,
        width: 100,
        justifyContent: 'center',
        borderRadius: 5
    },
    buttonDelete: {
        backgroundColor: BUTTONRED,
        borderWidth: 1,
        borderColor: BUTTONRED
    },
    buttonCancel: {
        borderColor: BUTTONGREY,
        borderWidth: 1
    },
    buttonText: {
        color: ALMOST_BLACK,
        textAlign: 'center'
    }
});

type DetailItemModalProps = {
    isVisible: boolean;
    onDeletePress?(): void;
    onBackdropPress(): void;
    created_at: string;
    model: string;
    brand: string;
    rackName?: string;
    category: string;
    serialNumber: string;
    rackLevel: number;
    rackId?: number;
    remove?: boolean;
};


const DetailItemModal = (props: DetailItemModalProps): React.ReactElement => {

    function renderButtons(): React.ReactElement {
        if(props.remove) {
        return (
            <View style={STYLES.buttonWrapper}>
                <Pressable
                    onPress={(): void => { props.onBackdropPress(); props.onDeletePress?.(); }}
                    style={[STYLES.button, STYLES.buttonDelete]}
                >
                    <Text style={[STYLES.buttonText, {color: ALMOST_WHITE, fontWeight: 'bold'}]}>Supprimer</Text>
                </Pressable>
                <Pressable
                    onPress={(): void => { props.onBackdropPress(); }}
                    style={[STYLES.button, STYLES.buttonCancel]}
                >
                    <Text style={[STYLES.buttonText, {color: '#374151', fontWeight: 'bold'}]}>Annuler</Text>
                </Pressable>
            </View>
        );
        }
        return <View />;
    }

    function getRackname(): string {
        if(props.rackName) {
            return props.rackName;
        }
        return `Étagère ${props.rackLevel}`;
    }

    return (
        <Modal
            isVisible={props.isVisible}
            style={{alignItems: 'center'}}
            animationIn="fadeIn"
            animationInTiming={10}
            animationOutTiming={10}
            animationOut="fadeOut"
            onBackdropPress={props.onBackdropPress}
        >
            <View style={STYLES.modalWrapper}>
                <CardModal
                    title1={'N° série'}
                    title2={'Modèle'}
                    content1={props.serialNumber}
                    content2={props.model}
                    label={'Produit'}
                />
                <CardModal
                    title1={'Catégorie'}
                    title2={'Marque'}
                    content1={props.category}
                    content2={props.brand}
                    label={'Type de produit'}
                />
                <CardModal
                    title1={'Étagère'}
                    title2={'Étage'}
                    content1={getRackname()}
                    content2={props.rackLevel.toString()}
                    label={'Position'}
                />
                <CardModal
                    title1={'Date'}
                    title2={'Heure'}
                    content1={props.created_at.split(/(\s+)/)[0]}
                    content2={props.created_at.split(/(\s+)/)[2]}
                    label={'Entrée en stock'}
                />
                {renderButtons()}
            </View>
        </Modal>
    );
};


export default DetailItemModal;
