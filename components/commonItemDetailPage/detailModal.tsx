import {
    View,
    StyleSheet,
    Text
} from 'react-native';
import React from 'react';
import {ALMOST_BLACK, CULTURED, DARKBLUEBLACK} from '../../style/colors';
import Modal from 'react-native-modal/dist/modal';
import CardModal from '../detailItemModal/cardModal';

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
        shadowOpacity:  0.16,
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
    }
});

type DetailModalProps = {
    isVisible: boolean;
    onBackdropPress(): void;
    created_at: string;
    model: string;
    brand: string;
    category: string;
    serialNumber: string;
    rackLevel: number;
    rackName: string;
};


const DetailModal = (props: DetailModalProps): React.ReactElement => {

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
                <Text style={[STYLES.textStyle, {width: '100%', textAlign: 'left', fontWeight: 'bold', top: 10}]}>Type de produit: </Text>
                <View style={{width: '108%'}}>
                    <View style={STYLES.componentWrapper}>
                        <View style={STYLES.headerWrapper}>
                            <Text style={STYLES.textStyle}>Catégorie</Text>
                            <Text style={STYLES.textStyle}>Brand</Text>
                        </View>
                        <View style={STYLES.contentWrapper}>
                            <View style={STYLES.textContent}>
                                <Text numberOfLines={1} style={[STYLES.textStyle, {fontWeight: 'bold'}]}>{props.category}</Text>
                                <Text numberOfLines={1} style={[STYLES.textStyle, {fontWeight: 'bold'}]}>{props.brand}</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <Text style={[STYLES.textStyle, {width: '100%', textAlign: 'left', fontWeight: 'bold', top: 10}]}>Position: </Text>
                <View style={{width: '108%'}}>
                    <View style={STYLES.componentWrapper}>
                        <View style={STYLES.headerWrapper}>
                            <Text style={STYLES.textStyle}>Étagère</Text>
                            <Text style={STYLES.textStyle}>Étage</Text>
                        </View>
                        <View style={STYLES.contentWrapper}>
                            <View style={STYLES.textContent}>
                                <Text numberOfLines={1} style={[STYLES.textStyle, {fontWeight: 'bold'}]}>{props.rackName}</Text>
                                <Text numberOfLines={1} style={[STYLES.textStyle, {fontWeight: 'bold'}]}>{props.rackLevel}</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <Text style={[STYLES.textStyle, {width: '100%', textAlign: 'left', fontWeight: 'bold', top: 10}]}>Entrée en stock: </Text>
                <View style={{width: '108%'}}>
                    <View style={STYLES.componentWrapper}>
                        <View style={STYLES.headerWrapper}>
                            <Text style={STYLES.textStyle}>Date</Text>
                            <Text style={STYLES.textStyle}>Heure</Text>
                        </View>
                        <View style={STYLES.contentWrapper}>
                            <View style={STYLES.textContent}>
                                <Text numberOfLines={1} style={[STYLES.textStyle, {fontWeight: 'bold', width: '33%', marginLeft: 18}]}>{props.created_at.split(/(\s+)/)[0]}</Text>
                                <Text numberOfLines={1} style={[STYLES.textStyle, {fontWeight: 'bold', width: '33%', marginRight: 22}]}>{props.created_at.split(/(\s+)/)[2]}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    );
};


export default DetailModal;
