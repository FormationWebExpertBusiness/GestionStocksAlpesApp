import {useMutation, useQuery} from '@apollo/client';
import type {ReactElement} from 'react';
import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {GET_PRODUCTS} from '../../graphql/query/getProducts';
import {GET_RACK} from '../../graphql/query/getRack';
import {BLACK, CULTURED, ERROR, SUCCESS, WHITE} from '../../style/colors';
import RemovePageHeader from './scanPageHeader';
import CustomTopTabNavigator from '../CustomTopTabNavigator';
import TableSkeleton from '../skeletons/tablesSkeleton/tableSkeleton';
import ScannedProductTable from '../scannedProductTable/ScannedProductTable';
import AddForm from './addForm';
import {ADD_PRODUCT} from '../../graphql/mutation/addProduct';
import Toast from 'react-native-root-toast';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {RootStackParamList} from '../../types/rootStackParamList';

const STYLES = StyleSheet.create({
    pageWrapper: {
        width: '100%',
        paddingHorizontal: 20,
        height: '100%',
        backgroundColor: CULTURED
    },
    text: {
        color: BLACK
    },
    pageContent: {
        height: '88%',
        paddingBottom: 150,
        marginTop: 20
    }
});

type Props = NativeStackScreenProps<RootStackParamList, 'ScannedProducts'>;

const ScannedProductsPage = ({navigation, route}: Props): ReactElement => {

    const [isFormModal, setIsFormModal] = useState<boolean>(false);
    const [isComplete, setIsComplete] = useState<boolean>(false);
    const [isToastVisible, setIsToastVisible] = useState<boolean>(false);
    const [isToastText, setIsToastText] = useState<string>('');
    const [isToastColor, setToastColor] = useState<string>('');

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const routeData: {values: {rack_id: number; rack_level: number;};} = route.params!;

    const [addProductMutation, addProductStatus] = useMutation(ADD_PRODUCT, {
        awaitRefetchQueries: true,
        refetchQueries: [
            {
                query: GET_PRODUCTS,
                fetchPolicy: 'network-only',
                variables: {
                    rack_id: routeData.values.rack_id,
                    rack_level: routeData.values.rack_level
                }
            },
            {
                query: GET_RACK,
                fetchPolicy: 'network-only',
                variables: {
                    id: routeData.values.rack_id,
                    level: routeData.values.rack_level
                }
            }
        ],
        onCompleted: (): void => {
            setIsFormModal(false);
            setIsComplete(true);
            setIsToastVisible(true);
            setIsToastText('Produit ajouté !');
            setToastColor(SUCCESS);
            setTimeout((): void => {
                setIsToastVisible(false);
            }, 2000);
        },
        onError: (): void => {
            setIsFormModal(false);
            setIsComplete(true);
            setIsToastVisible(true);
            setToastColor(ERROR);
            setIsToastText('Erreur lors de l\'ajout du produit');
            setTimeout((): void => {
                setIsToastVisible(false);
            }, 2000);
        }
    });


    const {loading, error, data} = useQuery(GET_PRODUCTS, {
        fetchPolicy: 'network-only',
        variables: {
            rack_id: routeData.values.rack_id,
            rack_level: routeData.values.rack_level
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

    const rackData = useQuery(GET_RACK, {
        fetchPolicy: 'network-only',
        variables: {
            id: routeData.values.rack_id,
            level: routeData.values.rack_level
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

    function renderFormModal(): ReactElement {
        if(rackData.loading) {
            return (
                <View />
            );
        } else if(rackData.error) {
            return (
                <View />
            );
        }
        return (
            <AddForm
                rackId={routeData.values.rack_id}
                complete={isComplete}
                onAddPress={addProductMutation}
                loading={addProductStatus.loading}
                onBackdropPress={(): void => {setIsFormModal(false);}}
                isVisible={isFormModal}
                rackName={rackData.data.rack.name}
                rackLevel={routeData.values.rack_level}
            />
        );
    }

    function renderHeader(): ReactElement {
        if(rackData.loading) {
            return (
                <RemovePageHeader title1={'Étagère'} title2={'Étage'} skeleton />
            );
        } else if(rackData.error) {
            return (
                <View>
                    <Text style={STYLES.text}>Error : {rackData.error.message}</Text>
                </View>
            );
        }

        return (
            <RemovePageHeader title1={'Étagère'} title2={'Étage'} size={rackData.data.rack.nb_products} content1={rackData.data.rack.name} content2={routeData.values.rack_level} />
        );
    }

    function renderResults(): ReactElement {
        if(loading) {
            return (
                <TableSkeleton number={6} title1={'Catégorie'} title2={'Modèle'} title3={'N° série'} animation='pulse' />
            );
        } else if(error) {
            return (
                <View>
                    <Text style={STYLES.text}>Error : {error.message}</Text>
                </View>
            );
        }

        return (
            <ScannedProductTable loading={loading} rack_id={routeData.values.rack_id} rack_level={routeData.values.rack_level} products={data.products} remove={true}/>
        );
    }


    return (
        <>
            <CustomTopTabNavigator
                mode={'plus'}
                onPressBack={(): void => { navigation.goBack(); } }
                onPressPlus={(): void => { setIsFormModal(true); } }
            />
            <View style={STYLES.pageWrapper}>
                <View style={STYLES.pageContent}>
                    {renderHeader()}
                    {renderResults()}
                </View>
            </View>
            {renderFormModal()}
            {renderToast()}
        </>
    );
};

export default ScannedProductsPage;
