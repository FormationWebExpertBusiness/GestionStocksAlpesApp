import {
    View,
    StyleSheet,
    Text,
    Pressable
} from 'react-native';
import React from 'react';
import {ALMOST_BLACK, ALMOST_WHITE, AVERAGE_GREY, BUTTONPURPLE, BUTTONRED, CULTURED, DARKBLUEBLACK, WHITE} from '../../style/colors';
import Modal from 'react-native-modal/dist/modal';
import CardModal from './cardModal';
import LottieView from 'lottie-react-native';
import {GET_PRODUCT_MODAL_DATA} from '../../graphql/query/getProductModalData';
import {useQuery} from '@apollo/client';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faXmark} from '@fortawesome/free-solid-svg-icons/faXmark';
import LoadingAnimation from '../../assets/loading_6.json';

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
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    },
    button: {
        height: 40,
        marginTop: 20,
        alignItems: 'center',
        width: 100,
        color: WHITE,
        justifyContent: 'center',
        borderRadius: 5
    },
    buttonDelete: {
        backgroundColor: BUTTONRED,
        borderWidth: 1,
        borderColor: BUTTONRED
    },
    buttonDeplace: {
        backgroundColor: BUTTONPURPLE,
        borderWidth: 1,
        borderColor: BUTTONPURPLE
    },
    buttonCancel: {
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
    lottie: {
        height: 70,
        width: 70,
        fontSize: 40

    }
});

type DetailProductModalProps = {
    id: number;
    isVisible: boolean;
    onDeletePress?(): void;
    loading?: boolean;
    onBackdropPress(): void;
    remove?: boolean;
};

const DetailProductModal = (props: DetailProductModalProps): React.ReactElement => {

    const productModalData = useQuery(GET_PRODUCT_MODAL_DATA, {
        fetchPolicy: 'network-only',
        variables: {
            product_id: props.id
        }
    });

    function renderButtons(): React.ReactElement {
        if(props.remove) {
            if(props.loading) {
                return (
                    <View style={STYLES.buttonWrapper}>
                    <Pressable
                        style={[STYLES.button, STYLES.buttonDeplace]}
                    >
                        <Text style={STYLES.buttonText}>Déplacer</Text>
                    </Pressable>
                        <View
                            style={[STYLES.button, STYLES.buttonDelete]}
                        >
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
                        style={[STYLES.button, STYLES.buttonDeplace]}
                    >
                        <Text style={STYLES.buttonText}>Déplacer</Text>
                    </Pressable>
                    <Pressable
                        onPress={(): void => { props.onDeletePress?.(); }}
                        style={[STYLES.button, STYLES.buttonDelete]}
                    >
                        <Text style={STYLES.buttonText}>Supprimer</Text>
                    </Pressable>
                </View>
            );
        }
        return <View />;
    }

    function renderContent(type: 'data' | 'skeleton'): React.ReactElement {

        if(type === 'data') {
            const {serial_number, model, category, brand, rack_level, rack, created_at} = productModalData.data.product;

            return (
                <>
                    <CardModal
                        title1={'N° série'}
                        title2={'Modèle'}
                        content1={serial_number}
                        content2={model}
                        label={'Produit'}
                    />
                    <CardModal
                        title1={'Catégorie'}
                        title2={'Marque'}
                        content1={category.name}
                        content2={brand.name}
                        label={'Type de produit'}
                    />
                    <CardModal
                        title1={'Étagère'}
                        title2={'Étage'}
                        content1={rack.name}
                        content2={rack_level.toString()}
                        label={'Position'}
                    />
                    <CardModal
                        title1={'Date'}
                        title2={'Heure'}
                        content1={created_at.split(/(\s+)/)[0]}
                        content2={created_at.split(/(\s+)/)[2]}
                        label={'Entrée en stock'}
                    />
                </>
            );
        }
        return (
            <>
                <CardModal
                    title1={'N° série'}
                    title2={'Modèle'}
                    skeleton={true}
                    label={'Produit'}
                />
                <CardModal
                    title1={'Catégorie'}
                    title2={'Marque'}
                    skeleton={true}
                    label={'Type de produit'}
                />
                <CardModal
                    title1={'Étagère'}
                    title2={'Étage'}
                    skeleton={true}
                    label={'Position'}
                />
                <CardModal
                    title1={'Date'}
                    title2={'Heure'}
                    skeleton={true}
                    label={'Entrée en stock'}
                />
            </>
        );

    }

    function renderCards(): React.ReactElement {

        if(productModalData.loading) {
            return (
                <>
                    {renderContent('skeleton')}
                </>
            );
        } else if(productModalData.error) {
            return <View>
                <Text style={STYLES.textStyle}>{productModalData.error.message}</Text>
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
            animationIn="fadeIn"
            animationInTiming={10}
            animationOutTiming={10}
            animationOut="fadeOut"
            onBackdropPress={!props.loading ? props.onBackdropPress : (): void => {null;}}
        >
            <View style={STYLES.modalWrapper}>
                <Pressable
                    onPress={props.onBackdropPress}
                    style={STYLES.buttonCancel}
                >
                    <FontAwesomeIcon color={AVERAGE_GREY} icon={faXmark} size={20} />
                </Pressable>
                {renderCards()}
                {renderButtons()}
            </View>
        </Modal>
    );
};


export default DetailProductModal;
