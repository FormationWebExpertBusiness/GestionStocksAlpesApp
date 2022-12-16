import {AVERAGE_GREY, RED, BLACK, WHITE, VERY_LIGHT_GREY, ALMOST_BLACK} from '../style/colors';

import React, {
    type LegacyRef,
    useEffect
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
        padding: 15,
        width: '100%'
    },
    error: {
        backgroundColor: WHITE,
        borderColor: RED,
        borderWidth: 2
    },
    notActive: {
        backgroundColor: VERY_LIGHT_GREY
    },
    wrapper: {
    }
});

type TextInputProps = {
    error?: number;
    innerRef?: LegacyRef<TextInput> | null;
    onSubmit?(): void;
    onValueChange?(newValue: string): void;
    password: boolean;
    placeholder: string;
    required?: boolean;
    value?: string | null;
};

const CustomTextInput = (props: TextInputProps): React.ReactElement => {
    const PLACEHOLDERVALUE = props.required !== false ? `${props.placeholder} *` : props.placeholder;
    const [STYLEINPUT, setStyleInput] = React.useState(STYLES.notActive);
    const [ERROR, setError] = React.useState(0);
    const [DISPLAYSTATE, setDisplayState] = React.useState<'flex' | 'none' | undefined>(props.value ? 'flex' : 'none');
    const [LITTLEPLACEHOLDERCOLOR, setLittlePlaceholercolor] = React.useState(AVERAGE_GREY);

    useEffect((): void => {
        if(props.error === undefined) {
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
