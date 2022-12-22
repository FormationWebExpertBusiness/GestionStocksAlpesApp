import type {ReactElement} from 'react';
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {BLACK, ERROR, PURPLE} from '../style/colors';
import CommonProductLine from './commonProductTable/CommonProductLine';
import {CubeIcon, XCircleIcon} from 'react-native-heroicons/outline';
import {LINESTYLES, TABLESTYLES} from '../style/tablesStyle';

type EmptyTableProps = {
    title1: string;
    title2: string;
    title3: string;
    content: string;
    type: 'empty' | 'error';
};

const STYLES = StyleSheet.create({
    text: {
        color: BLACK,
        fontSize: 18,
        fontWeight: 'bold'
    },
    contentWrapper: {
        justifyContent: 'center',
        marginBottom: 20,
        width: '100%',
        alignItems: 'center'
    }
});

const EmptyTable = (props: EmptyTableProps): ReactElement => {

    function renderError(): ReactElement {
        return (
            <View style={STYLES.contentWrapper}>
                <XCircleIcon color={ERROR} height={60} width={60}/>
                <Text style={STYLES.text}>{props.content}</Text>
            </View>
        );
    }

    function renderEmpty(): ReactElement {
        return (
            <View style={STYLES.contentWrapper}>
            <CubeIcon color={PURPLE} height={60} width={60}/>
            <Text style={STYLES.text}>{props.content}</Text>
        </View>
        );
    }

    function renderContent(): ReactElement {
        if(props.type === 'empty') {
            return (
                renderEmpty()
            );
        }
        return (
            renderError()
        );
    }

    return (
        <View style={TABLESTYLES.wrapper}>
        <CommonProductLine
            head={true}
            center={true}
            category={props.title1}
            model={props.title2}
            brand={props.title3}
        />
        <View style={[LINESTYLES.wrapper, LINESTYLES.evenWrapper, {height: 200}]}>
            {renderContent()}
        </View>
    </View>
    );
};

export default EmptyTable;
