/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
    View,
    Text,
    StyleSheet,
    Pressable
} from 'react-native';
import React, {useState} from 'react';
import {WHITE, VERY_LIGHT_GREY, ALMOST_WHITE, ALMOST_BLACK, VERY_VERY_LIGHT_GREY, RED} from '../../style/colors';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons/faMagnifyingGlass';
import {faXmark} from '@fortawesome/free-solid-svg-icons/faXmark';

const STYLES = StyleSheet.create({
    wrapper: {
        paddingBottom: 2,
        display: 'flex',
        height: 50,
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%'
    },
    text: {
        width: '27%',
        textAlign: 'center',
        color: ALMOST_BLACK
    },
    icon: {
        width: '5%',
        opacity: 0.5,
        alignItems: 'center'
    },
    oddWrapper: {
        backgroundColor: WHITE
    },
    evenWrapper: {
        backgroundColor: ALMOST_WHITE
    },
    activeItem: {
        backgroundColor: VERY_VERY_LIGHT_GREY
    },
    headWrapper: {
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5,
        backgroundColor: VERY_LIGHT_GREY
    }
});

type ScannedItemLineProps = {
    keyI?: number;
    head?: boolean;
    serialNumber: string;
    model: string;
    category: string;
    remove?: boolean;
};

const ScannedItemLine = (props: ScannedItemLineProps): React.ReactElement => {

    function getWrapperStyle(): object {
        if(props.head) {
            return STYLES.headWrapper;
        }

        return props.keyI! % 2 === 0 ? STYLES.evenWrapper : STYLES.oddWrapper;
    }

    const [itemStyle, setItemStyle] = useState<object>(getWrapperStyle());


    getWrapperStyle();

    function getIcon(): React.ReactElement {
        if(props.head) {
            return <View />;
        }
        if(props.remove) {
            return (
                <View style={STYLES.icon}>
                    <FontAwesomeIcon color={RED} icon={faXmark} size={17} />
                </View>
            );
        }
        return (
            <View style={STYLES.icon}>
                <FontAwesomeIcon color={ALMOST_BLACK} icon={faMagnifyingGlass} size={15} />
            </View>
        );
    }


    return (
        <Pressable
            style={[STYLES.wrapper, itemStyle]}
            onPressOut={(): void => { setItemStyle(getWrapperStyle()); }}
            onPressIn={(): void => { setItemStyle(STYLES.activeItem); }}
        >
            <Text style={STYLES.text} numberOfLines={1}>{props.category}</Text>
            <Text style={STYLES.text} numberOfLines={1}>{props.model}</Text>
            <Text style={[STYLES.text, {width: '35%'}]} numberOfLines={1}>{props.serialNumber}</Text>
            {getIcon()}
        </Pressable>
    );
};


export default ScannedItemLine;
