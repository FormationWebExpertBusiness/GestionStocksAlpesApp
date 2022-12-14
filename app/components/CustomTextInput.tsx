import {AVERAGE_GREY, RED, BLACK, WHITE, VERY_LIGHT_GREY, ALMOST_BLACK} from '../style/colors';

import type {
    ReactElement} from 'react';
import React, {
    type LegacyRef,
    useEffect,
    useState
} from 'react';

import {StyleSheet, Text, TextInput, View} from 'react-native';

const STYLES = StyleSheet.create({
    active: {
        backgroundColor: WHITE,
        borderColor: ALMOST_BLACK,
        borderWidth: 2
    },
    activePlaceholder: {
        fontFamily: 'Barlow-Medium',
        fontSize: 10,
        marginLeft: '6%',
        marginTop: '2%',
        position: 'absolute',
        zIndex: 9
    },
    baseInput: {
        borderRadius: 8,
        color: BLACK,
        fontFamily: 'Barlow-Regular',
        fontSize: 18,
        borderWidth: 2,
        padding: 15,
        width: '100%'
    },
    error: {
        backgroundColor: WHITE,
        borderColor: RED
    },
    notActive: {
        backgroundColor: VERY_LIGHT_GREY,
        borderColor: VERY_LIGHT_GREY
    },
    wrapper: {
    }
});

type TextInputProps = {
    error?: number;
    innerRef?: LegacyRef<TextInput> | null;
    onSubmit?(): void;
    onValueChange?(newValue: string): void;
    keyboardType?: 'ascii-capable' | 'decimal-pad' | 'default' | 'email-address' | 'name-phone-pad' | 'number-pad' | 'numbers-and-punctuation' | 'numeric' | 'phone-pad' | 'twitter' | 'url' | 'visible-password' | 'web-search' | undefined;
    password: boolean;
    placeholder: string;
    required?: boolean;
    value?: string | null;
};

const CustomTextInput = (props: TextInputProps): ReactElement => {
    const PLACEHOLDERVALUE = props.required !== false ? `${props.placeholder} *` : props.placeholder;
    const [STYLEINPUT, setStyleInput] = useState(STYLES.notActive);
    const [ERROR, setError] = useState(0);
    const [DISPLAYSTATE, setDisplayState] = useState<'flex' | 'none' | undefined>(props.value ? 'flex' : 'none');
    const [LITTLEPLACEHOLDERCOLOR, setLittlePlaceholercolor] = useState(AVERAGE_GREY);

    useEffect((): void => {
        if(props.error === undefined) {
            setError(0);
        } else if(props.error === 0) {
            setStyleInput(STYLES.notActive);
            setLittlePlaceholercolor(AVERAGE_GREY);
            setError(0);
        } else if(props.error === 1) {
            setStyleInput(STYLES.error);
            setLittlePlaceholercolor(RED);
            setError(1);
        } else {
            setError(2);
        }
    }, [props.error]);


    function activePlaceholder(text: string): void {
        if(!text.length) {
            setDisplayState('none');
        } else {
            setDisplayState('flex');
        }
    }

    return (
        <View style={STYLES.wrapper}>
            <Text style={[STYLES.activePlaceholder, {display: DISPLAYSTATE}, {color: LITTLEPLACEHOLDERCOLOR}]}>{PLACEHOLDERVALUE}</Text>
            <TextInput
                onChangeText={(text): void => {
                    activePlaceholder(text);
                    if(props.onValueChange) {
                        props.onValueChange(text);
                    }
                }}
                keyboardType={props.keyboardType}
                value={props.value ? props.value : undefined}
                onBlur={(): void => {
                    if(ERROR !== 0) {
                        setStyleInput(STYLES.error);
                        setLittlePlaceholercolor(RED);
                    } else {
                        setStyleInput(STYLES.notActive);
                        setLittlePlaceholercolor(AVERAGE_GREY);
                    }
                }}
                onFocus={(): void => {
                    if(ERROR !== 0) {
                        setStyleInput(STYLES.error);
                        setLittlePlaceholercolor(RED);
                    } else {
                        setStyleInput(STYLES.active);
                        setLittlePlaceholercolor(ALMOST_BLACK);
                    }
                }}
                style={[STYLES.baseInput, STYLEINPUT]}
                selectionColor={ALMOST_BLACK}
                placeholderTextColor={AVERAGE_GREY}
                placeholder={PLACEHOLDERVALUE}
                secureTextEntry={props.password}
                onSubmitEditing={props.onSubmit}
                ref={props.innerRef}
            />
        </View>
    );
};

export default CustomTextInput;
