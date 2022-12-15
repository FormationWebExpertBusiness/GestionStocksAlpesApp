/* eslint-disable @typescript-eslint/no-non-null-assertion */
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

const ScannedProductLine = (props: ScannedProductLineProps): React.ReactElement => {

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
                    <Text key={0} style={LINESTYLES.text} numberOfLines={1}>{props.product?.category.name}</Text>
                    <Text key={1} style={LINESTYLES.text} numberOfLines={1}>{props.product?.model}</Text>
                    <Text key={2} style={LINESTYLES.text} numberOfLines={1}>{props.product?.serial_number}</Text>
                </>
            );
        }
        return TEXTS;
    }

    function renderContent(): React.ReactElement {
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
