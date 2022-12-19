import {
    AVERAGE_GREY,
    BLACK,
    WHITE,
    VERY_LIGHT_GREY
} from '../style/colors';

import React, {
    useEffect,
    useState
} from 'react';

import {
    StyleSheet,
    Text
} from 'react-native';

import DropDownPicker from 'react-native-dropdown-picker';

DropDownPicker.addTranslation('FR', {
    NOTHING_TO_SHOW: '',
    PLACEHOLDER: '',
    SEARCH_PLACEHOLDER: '',
    SELECTED_ITEMS_COUNT_TEXT: {
        1: '1 élément sélectionné',
        n: '{count} éléments sélectionnés'
    }
});

DropDownPicker.setLanguage('FR');

const STYLES = StyleSheet.create({
    active: {
        backgroundColor: WHITE,
        elevation: 5,
        shadowColor: BLACK,
        shadowOffset: {
            height: 2,
            width: 0
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84
    },
    activePlaceholder: {
        color: AVERAGE_GREY,
        fontFamily: 'Barlow-Medium',
        fontSize: 10,
        marginLeft: 9,
        marginTop: 4,
        position: 'absolute',
        zIndex : 6000
    },
    dropdownWrapper: {
        borderWidth: 0,
        elevation: 5,
        overflow: 'visible',
        shadowColor: BLACK,
        shadowOffset: {
            height: 2,
            width: 0
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84
    },
    label: {
    },
    notActive: {
        backgroundColor: VERY_LIGHT_GREY,
        elevation: 0,
        shadowColor: BLACK,
        shadowOffset: {
            height: 2,
            width: 0
        },
        shadowOpacity: 0,
        shadowRadius: 0
    },
    texts: {
        color: BLACK,
        fontFamily: 'Barlow-Regular',
        fontSize: 18
    },
    wrapper: {
        borderWidth: 0,
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        whiteSpace: 'nowrap'
    }
});

type ItemType = {
    label: string;
    value: number | string;
};

type DropdownProps = {
    initialValue?: number[] | number | string | null;
    item: ItemType[];
    multiple: boolean;
    onValueChange?(newValue: unknown[] | number | string | null): void;
    placeholder: string;
    required?: boolean;
    zindex: number;
};

export const CustomDropdownPicker = (props: DropdownProps): React.ReactElement => {
    const PLACEHOLDERVALUE = props.required ?? true ? `${props.placeholder} *` : props.placeholder;
    const [isOpen, setIsOpen] = useState(false);
    const [OBJECT, setObject] = useState<number | string | null>(null);
    const [VALUEMULTIPLE, setValueMultiple] = useState<number[]>([]);
    const [DISPLAYSTATE, setDisplayState] = React.useState<'flex' | 'none' | undefined>(props.initialValue ? 'flex' : 'none');
    const [STYLEINPUT, setStyleInput] = React.useState(STYLES.notActive);
    const [ITEMS, setItems] = useState<ItemType[]>(props.item);

    useEffect((): void => {
        if(props.initialValue && props.multiple && Array.isArray(props.initialValue)) {
            setValueMultiple(props.initialValue);
            setDisplayState('flex');
        } else if(
            props.initialValue && !props.multiple
                && typeof props.initialValue === 'string' || typeof props.initialValue === 'number') {
            setObject(props.initialValue);
            setDisplayState('flex');
        }
    }, []);

    function simpleOrMultipleRenderer(): React.ReactElement {
        if(props.multiple) {
            return <DropDownPicker
                        onChangeValue={(value: unknown[] | number | string | null): void => {
                            // Get value back to parent
                            if(props.onValueChange) {
                                props.onValueChange(value);
                            }
                        }}
                        closeOnBackPressed={true}
                        onOpen={(): void => {setStyleInput(STYLES.active);}}
                        onClose={(): void => {setStyleInput(STYLES.notActive);}}
                        placeholder={PLACEHOLDERVALUE}
                        placeholderStyle={{color: AVERAGE_GREY}}
                        open={isOpen}
                        hideSelectedItemIcon={true}
                        listMode="SCROLLVIEW"
                        multiple={true}
                        dropDownDirection="BOTTOM"
                        value={VALUEMULTIPLE}
                        labelStyle={STYLES.label}

                        /* 5000 because there is already a zIndex 5000 in the lib */
                        zIndex={5000 + props.zindex}
                        showTickIcon={props.multiple}
                        style={[STYLEINPUT, STYLES.wrapper]}
                        dropDownContainerStyle={STYLES.dropdownWrapper}
                        items={ITEMS}
                        textStyle={STYLES.texts}
                        setOpen={setIsOpen}
                        setValue={setValueMultiple}
                        setItems={setItems}
                    />;
        }
            return <DropDownPicker
                        closeOnBackPressed={true}
                        onChangeValue={(value: unknown[] | number | string | null): void => {
                            // Get value back to parent
                            if(props.onValueChange) {
                                props.onValueChange(value);
                            }
                        }}
                        onOpen={(): void => {setStyleInput(STYLES.active);}}
                        onClose={(): void => {setStyleInput(STYLES.notActive);}}
                        placeholder={PLACEHOLDERVALUE}
                        placeholderStyle={{color: AVERAGE_GREY}}
                        open={isOpen}
                        hideSelectedItemIcon={true}
                        listMode="SCROLLVIEW"
                        multiple={false}
                        dropDownDirection="BOTTOM"
                        value={OBJECT}
                        labelStyle={STYLES.label}

                        /* 5000 because there is already a zIndex 5000 in the lib */
                        zIndex={5000 + props.zindex}
                        showTickIcon={props.multiple}
                        style={[STYLEINPUT, STYLES.wrapper]}
                        dropDownContainerStyle={STYLES.dropdownWrapper}
                        items={ITEMS}
                        textStyle={STYLES.texts}
                        setOpen={setIsOpen}
                        setValue={setObject}
                        setItems={setItems}
                    />;

    }

    return (
        <>
            {simpleOrMultipleRenderer()}
            <Text
                style={[
                    STYLES.activePlaceholder,
                    {display: DISPLAYSTATE, zIndex: 5000 + props.zindex}
                ]}>
                {PLACEHOLDERVALUE}
            </Text>
        </>
    );
};
