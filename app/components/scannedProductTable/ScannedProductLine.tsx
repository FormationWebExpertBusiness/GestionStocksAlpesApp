import {
    View,
    Text,
    Pressable
} from 'react-native';
import type {ReactElement} from 'react';
import React, {useState} from 'react';
import {ALMOST_BLACK} from '../../style/colors';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons/faMagnifyingGlass';
import {LINESTYLES} from '../../style/tablesStyle';
import type {ScannedProduct} from '../../types/ScannedProductType';

type ScannedProductLineProps = {
    id: number;
    keyI?: number;
    head?: boolean;
    rack_id?: number;
    rack_level?: number;
    product?: ScannedProduct;
    onPress?(): void;
    title1?: string;
    title2?: string;
    title3?: string;
};

const ScannedProductLine = (props: ScannedProductLineProps): ReactElement => {

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

    function getIcon(): ReactElement {
        if(props.head) {
            return <View />;
        }
        return (
            <View style={LINESTYLES.icon}>
                <FontAwesomeIcon color={ALMOST_BLACK} icon={faMagnifyingGlass} size={12} />
            </View>
        );
    }

    function getTextComponents(): ReactElement {
        if(props.head) {
            return (
                <>
                    <Text key={0} style={LINESTYLES.text} numberOfLines={1}>{props.title1}</Text>
                    <Text key={1} style={LINESTYLES.text} numberOfLines={1}>{props.title2}</Text>
                    <Text key={2} style={LINESTYLES.text} numberOfLines={1}>{props.title3}</Text>
                </>
            );
        }
        return (
            <>
                <Text key={0} style={LINESTYLES.text} numberOfLines={1}>{props.product?.category.name}</Text>
                <Text key={1} style={LINESTYLES.text} numberOfLines={1}>{props.product?.model}</Text>
                <Text key={2} style={LINESTYLES.text} numberOfLines={1}>{props.product?.serial_number}</Text>
            </>
        );
    }

    function renderContent(): ReactElement {
        return (
            <>
                {getTextComponents()}
                {getIcon()}
            </>
        );
    }



    return (
        <View>
            <Pressable
                style={[LINESTYLES.wrapper, productStyle]}
                onPressOut={(): void => { setProductStyle(getWrapperStyle()); }}
                onPressIn={(): void => { if(!props.head)setProductStyle(LINESTYLES.activeProduct); }}
                onPress={(): void => { props.onPress?.(); }}
            >
                {renderContent()}
            </Pressable>
        </View>
    );
};


export default ScannedProductLine;
