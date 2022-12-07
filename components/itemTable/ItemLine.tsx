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

type ItemLineProps = {
    keyI?: number;
    head?: boolean;
    created_at?: string;
    model?: string;
    brand?: string;
    category?: string;
    serialNumber: string;
    rackLevel: number | string;
    rackName: string;
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
            return <DetailItemModal
                created_at={props.created_at!}
                model={props.model!}
                brand={props.brand!}
                category={props.category!}
                serialNumber={props.serialNumber}
                rackLevel={Number(props.rackLevel)}
                rackName={props.rackName}
                isVisible={isModalVisible}
                onBackdropPress={(): void => {setIsModalVisible(false);}}
            />;
        }
        return <View />;
    }


    return (
        <View>
            <Pressable
                style={[LINESTYLES.wrapper, itemStyle]}
                onPressOut={(): void => { setItemStyle(getWrapperStyle()); } }
                onPressIn={(): void => { setItemStyle(LINESTYLES.activeItem); } }
                onPress={(): void => { setIsModalVisible(true); } }
            >
                <Text style={LINESTYLES.text} numberOfLines={1}>{props.serialNumber}</Text>
                <Text style={LINESTYLES.text} numberOfLines={1}>{props.rackName}</Text>
                <Text style={LINESTYLES.text} numberOfLines={1}>{props.rackLevel}</Text>
                {getIcon()}
            </Pressable>
            {renderModal()}
        </View>
    );
};


export default ItemLine;
