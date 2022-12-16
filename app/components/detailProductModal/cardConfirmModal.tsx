import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {ALMOST_BLACK, CULTURED, DARKBLUEBLACK} from '../../style/colors';

type CardConfirmModalProps = {
    title1: string;
    title2: string;
    content1: string;
    content2: string;
};

const STYLES = StyleSheet.create({
    componentWrapper: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        justifyContent: 'space-between'
    },
    cardWrapper: {
        display: 'flex',
        flexDirection: 'column',
        padding: 10,
        borderRadius: 5,
        backgroundColor: CULTURED,
        shadowColor: DARKBLUEBLACK,
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowOpacity: 0.16,
        shadowRadius: 1.51,
        elevation: 2
    },
    headerWrapper: {
        flexDirection: 'row',
        opacity: 0.4,
        justifyContent: 'space-between'
    },
    contentWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    text: {
        width: '50%',
        color: ALMOST_BLACK,
        textAlign: 'center'
    },
    textContent: {
        fontWeight: 'bold'
    }
});

const CardConfirmModal = (props: CardConfirmModalProps): React.ReactElement => {
    return (
        <View style={STYLES.componentWrapper}>
            <View style={STYLES.cardWrapper}>
                <View style={STYLES.headerWrapper}>
                    <Text style={STYLES.text}>{props.title1}</Text>
                    <Text style={STYLES.text}>{props.title2}</Text>
                </View>
                <View style={STYLES.contentWrapper}>
                    <Text numberOfLines={1} style={[STYLES.text, STYLES.textContent]}>{props.content1}</Text>
                    <Text numberOfLines={1} style={[STYLES.text, STYLES.textContent]}>{props.content2}</Text>
                </View>
            </View>
        </View>
    );
};

export default CardConfirmModal;
