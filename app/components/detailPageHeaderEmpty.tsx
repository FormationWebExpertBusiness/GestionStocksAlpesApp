/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
    View,
    StyleSheet,
    Text
} from 'react-native';
import type {ReactElement} from 'react';
import React, {useState} from 'react';
import {CubeIcon, XCircleIcon} from 'react-native-heroicons/outline';
import {ALMOST_BLACK, BADGEDOTGREEN, BADGEDOTORANGE, BADGEDOTPURPLE, BADGEDOTRED, BADGEGREEN, BADGEORANGE, BADGEPURPLE, BADGERED, BADGETEXTGREEN, BADGETEXTORANGE, BADGETEXTPURPLE, BADGETEXTRED, CULTURED, DARKBLUEBLACK, ERROR, PURPLE} from '../style/colors';

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
    contentText: {
        textAlign: 'center',
        marginLeft: 25,
        fontWeight: 'bold',
        color: ALMOST_BLACK,
        fontSize: 15
    },
    contentTextIcon: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: 20,
        flexDirection: 'row'
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
        justifyContent: 'space-between',
        width: '100%'
    }
});

type DetailPageHeaderEmptyProps = {
    title1: string;
    title2: string;
    title3?: string;
    quantityCritical?: number;
    quantityLow?: number;
    type: 'empty' | 'error';
    scanned?: boolean;
};


const DetailPageHeaderEmpty = (props: DetailPageHeaderEmptyProps): ReactElement => {

    function getBadgeTextColor(): string {
        if(props.scanned) return BADGETEXTPURPLE;
        if(props.quantityCritical! > 0) {
            return BADGETEXTRED;
        } else if(props.quantityLow! > 0) {
            return BADGETEXTORANGE;
        }
        return BADGETEXTGREEN;
    }

    function getBadgeDotColor(): string {
        if(props.scanned) return BADGEDOTPURPLE;
        if(props.quantityCritical! > 0) {
            return BADGEDOTRED;
        } else if(props.quantityLow! > 0) {
            return BADGEDOTORANGE;
        }
        return BADGEDOTGREEN;
    }

    function getBadgeColor(): string {
        if(props.scanned) return BADGEPURPLE;
        if(props.quantityCritical! > 0) {
            return BADGERED;
        } else if(props.quantityLow! > 0) {
            return BADGEORANGE;
        }
        return BADGEGREEN;
    }

    const [badgeColor] = useState<string>(getBadgeColor());
    const [badgeDotColor] = useState<string>(getBadgeDotColor());
    const [badgeTextColor] = useState<string>(getBadgeTextColor());

    function renderContent(): ReactElement {
        if(props.type === 'error') {
            return (
                <View style={STYLES.contentTextIcon}>
                    <XCircleIcon color={ERROR} height={30} width={30}/>
                    <Text numberOfLines={1} style={[STYLES.contentText]}>Une erreur est survenu !</Text>
                </View>
            );
        }
        return (
            <View style={STYLES.contentTextIcon}>
                <CubeIcon color={PURPLE} height={30} width={30}/>
                <Text numberOfLines={1} style={[STYLES.contentText]}>Aucun produit</Text>
            </View>
        );

    }

    function renderBadge(): ReactElement {
        if(props.type === 'empty') {
            return (
                <View style={STYLES.badgeWrapper}>
                    <View style={[STYLES.badge, {backgroundColor: badgeColor}]}>
                        <View style={[STYLES.badgeDot, {backgroundColor: badgeDotColor}]} />
                        <Text style={[STYLES.badgeText, {color: badgeTextColor}]}>0</Text>
                    </View>
                </View>
            );
        }
        return <View />;
    }

    return (
        <View style={STYLES.componentWrapper}>
            <View style={STYLES.headerWrapper}>
                <Text style={STYLES.textStyle}>{props.title1}</Text>
                <Text style={STYLES.textStyle}>{props.title2}</Text>
                {props.title3 && <Text style={STYLES.textStyle}>{props.title3}</Text>}
                <Text style={[STYLES.textStyle]}>Quantité</Text>
            </View>
            <View style={STYLES.contentWrapper}>
                <View style={STYLES.textContent}>
                    {renderContent()}
                </View>
                {renderBadge()}
            </View>
        </View>
    );
};


export default DetailPageHeaderEmpty;
