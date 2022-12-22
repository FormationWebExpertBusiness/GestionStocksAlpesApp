import {
    View,
    StyleSheet,
    Text
} from 'react-native';
import type {ReactElement} from 'react';
import React from 'react';
import {ALMOST_BLACK, CULTURED, DARKBLUEBLACK} from '../../style/colors';

const STYLES = StyleSheet.create({
    componentWrapper: {
        height: 100,
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
    textLabel: {
        textAlign: 'left',
        fontWeight: 'bold',
        top: 10
    },
    textContent: {
        fontWeight: 'bold'
    }
});

type CardModalProps = {
    title1: string;
    title2: string;
    content1?: string;
    content2?: string;
    label: string;
    skeleton?: boolean;
};


const CardModal = (props: CardModalProps): ReactElement => {

    function renderContent(): ReactElement {
        if(props.skeleton) {
            return (
                <>
                    <Text numberOfLines={1} style={[STYLES.text, STYLES.textContent]}>...</Text>
                    <Text numberOfLines={1} style={[STYLES.text, STYLES.textContent]}>...</Text>
                </>
            );
        }
        return (
            <>
                <Text numberOfLines={1} style={[STYLES.text, STYLES.textContent]}>{props.content2}</Text>
                <Text numberOfLines={1} style={[STYLES.text, STYLES.textContent]}>{props.content1}</Text>
            </>
        );

    }


        return (
            <View style={STYLES.componentWrapper}>
                <Text style={[STYLES.text, STYLES.textLabel]}>{props.label}:</Text>
                <View style={STYLES.cardWrapper}>
                    <View style={STYLES.headerWrapper}>
                        <Text style={STYLES.text}>{props.title1}</Text>
                        <Text style={STYLES.text}>{props.title2}</Text>
                    </View>
                    <View style={STYLES.contentWrapper}>
                        {renderContent()}
                    </View>
                </View>
            </View>
    );
};


export default CardModal;
