import {
    View,
    Text,
    Pressable
} from 'react-native';
import type {ReactElement} from 'react';
import React, {useState} from 'react';
import {ALMOST_BLACK, VERY_LIGHT_GREY} from '../../style/colors';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons/faMagnifyingGlass';
import {useNavigation} from '@react-navigation/native';
import {LINESTYLES} from '../../style/tablesStyle';
import type {RootStackParamList} from '../../types/rootStackParamList';

type ProductLineProps = {
    keyI?: number;
    center?: boolean;
    head?: boolean;
    id?: number;
    category: string;
    model: string;
    brand: string;
};

const commonProductLine = (props: ProductLineProps): ReactElement => {
    const navigation = useNavigation<RootStackParamList>();


    function getWrapperStyle(): object {
        if(props.head) {
            if(props.center) return LINESTYLES.centerHeadWrapper;
            return LINESTYLES.headWrapper;
        } else if(props.keyI !== undefined && props.keyI % 2 === 0) {
            return LINESTYLES.evenWrapper;
        }
        return LINESTYLES.oddWrapper;
    }

    const [productStyle, setProductStyle] = useState<object>(getWrapperStyle());


    getWrapperStyle();

    function getIcon(): ReactElement {
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
            return (): void => {null;};
        }

        return (): void => {
            navigation.navigate('CommonProductDetail', {commonProductId: props.id});
        };

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
            {props.center !== true ? getIcon() : null}
        </Pressable>
    );
};


export default commonProductLine;
