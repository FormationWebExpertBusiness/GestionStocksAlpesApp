/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
    View,
    Text,
    Pressable
} from 'react-native';
import React, {useState} from 'react';
import {ALMOST_BLACK, VERY_LIGHT_GREY} from '../../style/colors';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons/faMagnifyingGlass';
import {useNavigation} from '@react-navigation/native';
import {LINESTYLES} from '../../style/tablesStyle';

type ProductLineProps = {
    keyI?: number;
    head?: boolean;
    id?: number;
    category: string;
    model: string;
    brand: string;
};

const commonProductLine = (props: ProductLineProps): React.ReactElement => {
    const navigation = useNavigation();


    function getWrapperStyle(): object {
        if(props.head) {
            return LINESTYLES.headWrapper;
        }


        return props.keyI! % 2 === 0 ? LINESTYLES.evenWrapper : LINESTYLES.oddWrapper;
    }

    const [productStyle, setProductStyle] = useState<object>(getWrapperStyle());


    getWrapperStyle();

    function getIcon(): React.ReactElement {
        if(props.head) {
            return <View style={[LINESTYLES.icon, {backgroundColor: VERY_LIGHT_GREY}]} />;
        }
        return (
            <View style={LINESTYLES.icon}>
                <FontAwesomeIcon color={ALMOST_BLACK} icon={faMagnifyingGlass} size={12} />
            </View>
        );
    }

    function getOnPressNavigate(): () => void {
        if(props.head) {
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            return (): void => {};
        }
        return (): void => { navigation.navigate('CommonProductDetail', {commonProductId: props.id}); };
    }

    return (
        <Pressable
            style={[LINESTYLES.wrapper, productStyle]}
            onPressOut={(): void => { if(!props.head)setProductStyle(getWrapperStyle()); }}
            onPress={getOnPressNavigate()}
            onPressIn={(): void => { if(!props.head)setProductStyle(LINESTYLES.activeProduct); }}
        >
            <Text style={LINESTYLES.text} numberOfLines={1}>{props.category}</Text>
            <Text style={LINESTYLES.text} numberOfLines={1}>{props.model}</Text>
            <Text style={LINESTYLES.text} numberOfLines={1}>{props.brand}</Text>
            {getIcon()}
        </Pressable>
    );
};


export default commonProductLine;
