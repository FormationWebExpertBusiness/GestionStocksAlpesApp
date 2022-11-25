/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
    View,
    Text,
    StyleSheet,
    Pressable
} from 'react-native';
import React, {useState} from 'react';
import {WHITE, VERY_LIGHT_GREY, ALMOST_WHITE, ALMOST_BLACK, VERY_VERY_LIGHT_GREY} from '../../style/colors';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons/faMagnifyingGlass';
import {useNavigation} from '@react-navigation/native';

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
        width: '30%',
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


type ItemLineProps = {
    keyI?: number;
    head?: boolean;
    category: string;
    model: string;
    brand: string;
    items?: {
        numSerie: string;
        rackId: number;
        rackLevel: number;
    }[];

};

const commonItemLine = (props: ItemLineProps): React.ReactElement => {
    const navigation = useNavigation();


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
        return (
            <View style={STYLES.icon}>
                <FontAwesomeIcon color={ALMOST_BLACK} icon={faMagnifyingGlass} size={15} />
            </View>
        );
    }

    function getOnPressNavigate(): () => void {
        if(props.head) {
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            return (): void => {};
        }
        return (): void => { navigation.navigate('CommonItemDetail', {item: props}); };
    }

    return (
        <Pressable
            style={[STYLES.wrapper, itemStyle]}
            onPressOut={(): void => { setItemStyle(getWrapperStyle()); }}
            onPress={getOnPressNavigate()}
            onPressIn={(): void => { setItemStyle(STYLES.activeItem); }}
        >
            <Text style={STYLES.text} numberOfLines={1}>{props.category}</Text>
            <Text style={STYLES.text} numberOfLines={1}>{props.model}</Text>
            <Text style={STYLES.text} numberOfLines={1}>{props.brand}</Text>
            {getIcon()}
        </Pressable>
    );
};


export default commonItemLine;
