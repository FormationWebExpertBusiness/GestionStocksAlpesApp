import {
    View,
    StyleSheet,
    Text
} from 'react-native';
import React, {useState} from 'react';
import {ALMOST_BLACK, CULTURED, DARKBLUEBLACK} from '../../style/colors';

const STYLES = StyleSheet.create({
    componentWrapper: {
        display: 'flex',
        flexDirection: 'column',
        paddingTop: 10,
        paddingBottom: 15,
        paddingHorizontal: 15,
        borderRadius: 5,
        backgroundColor: CULTURED,
        shadowColor: DARKBLUEBLACK,
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowOpacity:  0.16,
        shadowRadius: 1.51,
        elevation: 2
    },
    textStyle: {
        width: 70,
        color: ALMOST_BLACK,
        textAlign: 'center'
    },
    textContent: {
        flexDirection: 'row',
        width: '60%',
        justifyContent: 'space-between'
    },
    headerWrapper: {
        flexDirection: 'row',
        opacity: 0.4,
        width: '100%',
        justifyContent: 'space-between'
    },
    badgeWrapper: {
        width: '40%',
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    badge: {
        borderRadius: 15,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: 38,
        height: 20,
        paddingHorizontal: 7
    },
    badgeText: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 11
    },
    badgeDot: {
        width: 6,
        height: 6,
        borderRadius: 5
    },
    contentWrapper: {
        display: 'flex',
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});

type DetailPageHeaderProps = {
    title1: string;
    size: number;
    content1: string;
};


const RemovePageHeader = (props: DetailPageHeaderProps): React.ReactElement => {

    const [badgeColor] = useState<string>('#bfbdfe');
    const [badgeDotColor] = useState<string>('#6360FA');
    const [badgeTextColor] = useState<string>('#1e40af');

    return (
        <View style={STYLES.componentWrapper}>
            <View style={STYLES.headerWrapper}>
                <Text style={[STYLES.textStyle]}>{props.title1}</Text>
                <Text style={[STYLES.textStyle, {marginRight: -5}]}>Quantité</Text>
            </View>
            <View style={STYLES.contentWrapper}>
            <View style={STYLES.textContent}>
                <Text numberOfLines={1} style={[STYLES.textStyle, {fontWeight: 'bold'}]}>{props.content1}</Text>
            </View>
            <View style={STYLES.badgeWrapper}>
                <View style={[STYLES.badge, {backgroundColor: badgeColor}]}>
                    <View style={[STYLES.badgeDot, {backgroundColor: badgeDotColor}]} />
                    <Text style={[STYLES.badgeText, {color: badgeTextColor}]}>{props.size}</Text>
                </View>
            </View>
            </View>
        </View>
    );
};


export default RemovePageHeader;
