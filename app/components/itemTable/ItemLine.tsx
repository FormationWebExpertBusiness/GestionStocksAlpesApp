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
import DetailItemModal from '../detailItemModal/detailItemModal';
import type {Item} from '../../types/ItemType';

type ItemLineProps = {
    id?: number;
    keyI?: number;
    head?: boolean;
    model?: string;
    brand?: string;
    category?: string;
    item?: Item;
    title1?: string;
    title2?: string;
    title3?: string;
};

const ItemLine = (props: ItemLineProps): React.ReactElement => {

    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

    function getWrapperStyle(): object {
        if(props.head) {
            return LINESTYLES.headWrapper;
        }

        return props.keyI! % 2 === 0 ? LINESTYLES.evenWrapper : LINESTYLES.oddWrapper;
    }

    const [itemStyle, setItemStyle] = useState<object>(getWrapperStyle());


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

    function renderModal(): React.ReactElement {
        if(!props.head) {
            return (
                <DetailItemModal
                    id={props.id!}
                    isVisible={isModalVisible}
                    onBackdropPress={(): void => {setIsModalVisible(false);}}
                />
            );
        }
        return <View />;
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
                    <Text key={0} style={LINESTYLES.text} numberOfLines={1}>{props.item?.serial_number}</Text>
                    <Text key={1} style={LINESTYLES.text} numberOfLines={1}>{props.item?.rack.name}</Text>
                    <Text key={2} style={LINESTYLES.text} numberOfLines={1}>{props.item?.rack_level}</Text>
                </>
            );
        }
        return TEXTS;
    }


    return (
        <View>
            <Pressable
                style={[LINESTYLES.wrapper, itemStyle]}
                onPressOut={(): void => { setItemStyle(getWrapperStyle()); } }
                onPressIn={(): void => { if(!props.head)setItemStyle(LINESTYLES.activeItem); } }
                onPress={(): void => { setIsModalVisible(true); } }
            >
                {getTextComponents()}
                {getIcon()}
            </Pressable>
            {renderModal()}
        </View>
    );
};


export default ItemLine;
