import {
    View,
    StyleSheet,
    Text
} from 'react-native';
import React, {useState} from 'react';
import {ALMOST_BLACK, BADGEDOTORANGE, BADGEDOTRED, BADGEGREEN, BADGEORANGE, BADGERED, BADGETEXTGREEN, BADGETEXTORANGE, BADGETEXTRED, CULTURED, DARKBLUEBLACK} from '../../style/colors';

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
        width: '80%',
        justifyContent: 'space-between'
    },
    headerWrapper: {
        flexDirection: 'row',
        width: '105%',
        justifyContent: 'space-between',
        opacity: 0.4
    },
    badgeWrapper: {
        width: '20%',
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    badge: {
        borderRadius: 15,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: 41,
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
    title2: string;
    title3: string;
    quantityUrgent: number;
    quantityWarning: number;
    size: number;
    content1: string;
    content2: string;
    content3: string;
};


const DetailPageHeader = (props: DetailPageHeaderProps): React.ReactElement => {

    function getBadgeTextColor(): string {
        if(props.size < props.quantityUrgent) {
            return BADGETEXTRED;
        } else if(props.size < props.quantityWarning) {
            return BADGETEXTORANGE;
        }
            return BADGETEXTGREEN;
    }

    function getBadgeDotColor(): string {
        if(props.size < props.quantityUrgent) {
            return BADGEDOTRED;
        } else if(props.size < props.quantityWarning) {
            return BADGEDOTORANGE;
        }
            return BADGETEXTGREEN;
    }

    function getBadgeColor(): string {
        if(props.size < props.quantityUrgent) {
            return BADGERED;
        } else if(props.size < props.quantityWarning) {
            return BADGEORANGE;
        }
            return BADGEGREEN;
    }

    const [badgeColor] = useState<string>(getBadgeColor());
    const [badgeDotColor] = useState<string>(getBadgeDotColor());
    const [badgeTextColor] = useState<string>(getBadgeTextColor());

    return (
        <View style={STYLES.componentWrapper}>
            <View style={STYLES.headerWrapper}>
                <Text style={STYLES.textStyle}>{props.title1}</Text>
                <Text style={STYLES.textStyle}>{props.title2}</Text>
                <Text style={STYLES.textStyle}>{props.title3}</Text>
                <Text style={[STYLES.textStyle]}>Quantité</Text>
            </View>
            <View style={STYLES.contentWrapper}>
            <View style={STYLES.textContent}>
                <Text numberOfLines={1} style={[STYLES.textStyle, {fontWeight: 'bold'}]}>{props.content1}</Text>
                <Text numberOfLines={1} style={[STYLES.textStyle, {fontWeight: 'bold'}]}>{props.content2}</Text>
                <Text numberOfLines={1} style={[STYLES.textStyle, {fontWeight: 'bold'}]}>{props.content3}</Text>
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


export default DetailPageHeader;
