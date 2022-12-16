import {
    View,
    Text,
    Pressable
} from 'react-native';
import React, {useState} from 'react';
import {ALMOST_BLACK} from '../../style/colors';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons/faMagnifyingGlass';
import {LINESTYLES} from '../../style/tablesStyle';
import type {Product} from '../../types/ProductType';

type ProductLineProps = {
    id?: number;
    keyI?: number;
    head?: boolean;
    onPress?(): void;
    model?: string;
    brand?: string;
    category?: string;
    product?: Product;
    title1?: string;
    title2?: string;
    title3?: string;
};

const ProductLine = (props: ProductLineProps): React.ReactElement => {

    function getWrapperStyle(): object {
        if(props.head) {
            return LINESTYLES.headWrapper;
        } else if(props.keyI !== undefined && props.keyI % 2 === 0) {
            return LINESTYLES.evenWrapper;
        }
        return LINESTYLES.oddWrapper;
    }

    const [productStyle, setProductStyle] = useState<object>(getWrapperStyle());


    getWrapperStyle();

    function getIcon(): React.ReactElement {
        if(props.head) {
            return <View />;
        }
        return (
            <View style={LINESTYLES.icon}>
                <FontAwesomeIcon color={ALMOST_BLACK} icon={faMagnifyingGlass} size={12} />
            </View>
        );
    }

    function getTextComponents(): React.ReactElement[] {
        const TEXTS: React.ReactElement[] = [];
        if(props.head) {
            TEXTS.push(
                <>
                    <Text key={0} style={LINESTYLES.text} numberOfLines={1}>{props.title1}</Text>
                    <Text key={1} style={LINESTYLES.text} numberOfLines={1}>{props.title2}</Text>
                    <Text key={2} style={LINESTYLES.text} numberOfLines={1}>{props.title3}</Text>
                </>
            );
        } else {
            TEXTS.push(
                <>
                    <Text key={0} style={LINESTYLES.text} numberOfLines={1}>{props.product?.serial_number}</Text>
                    <Text key={1} style={LINESTYLES.text} numberOfLines={1}>{props.product?.rack.name}</Text>
                    <Text key={2} style={LINESTYLES.text} numberOfLines={1}>{props.product?.rack_level}</Text>
                </>
            );
        }
        return TEXTS;
    }


    return (
        <View>
            <Pressable
                style={[LINESTYLES.wrapper, productStyle]}
                onPressOut={(): void => { setProductStyle(getWrapperStyle()); } }
                onPressIn={(): void => { if(!props.head)setProductStyle(LINESTYLES.activeProduct); } }
                onPress={(): void => { props.onPress?.(); } }
            >
                {getTextComponents()}
                {getIcon()}
            </Pressable>
        </View>
    );
};


export default ProductLine;
