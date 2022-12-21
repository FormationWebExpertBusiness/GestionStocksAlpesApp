import {
    View,
    Text,
    SafeAreaView,
    StyleSheet
} from 'react-native';
import React, {useState} from 'react';
import CommonProductTable from '../commonProductTable/CommonProductTable';
import CustomTextInput from '../CustomTextInput';
import CustomTopTabNavigator from '../CustomTopTabNavigator';
import {useQuery} from '@apollo/client';
import {GET_COMMONPRODUCTS} from '../../graphql/query/getCommonProducts';
import {BLACK, ERROR, WHITE} from '../../style/colors';
import TableSkeleton from '../skeletons/tablesSkeleton/tableSkeleton';
import Toast from 'react-native-root-toast';

const STYLES = StyleSheet.create({
    wrapper: {
        width: '100%',
        marginTop: 20,
        paddingHorizontal: 20,
        height: '81%',
        paddingBottom: 50
    },
    textStyle: {
        height: 100,
        width: 100,
        color: BLACK
    }
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const HomePage = ({navigation}: any): React.ReactElement => {

    const [isToastVisible, setIsToastVisible] = useState<boolean>(false);
    const [isToastText, setIsToastText] = useState<string>('');
    const [isToastColor, setToastColor] = useState<string>('');

    const commonProductsData = useQuery(GET_COMMONPRODUCTS, {
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

    function renderTable(): React.ReactElement {
        if(commonProductsData.loading) {
            return (
                    <TableSkeleton number={6} title1={'Catégorie'} title2={'Modèle'} title3={'Marque'} animation='pulse' />
            );
        } else if(commonProductsData.error) {
            return <View>
                <Text style={STYLES.textStyle}>Error : {commonProductsData.error.message}</Text>
                </View>;
        }
        return <CommonProductTable commonProducts={commonProductsData.data.commonProducts}/>;
    }

    function renderToast(): React.ReactElement {
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

    return (
        <SafeAreaView>
            <CustomTopTabNavigator
                mode={'all'}
                onPressScan={(): void => {navigation.navigate('Scan');}}
            />
            <View style={STYLES.wrapper}>
                <CustomTextInput required={false} password={false} placeholder={'Recherche'} />
                {renderTable()}
            </View>
            {renderToast()}
        </SafeAreaView>
    );
};


export default HomePage;
