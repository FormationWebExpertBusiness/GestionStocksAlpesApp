import {Pressable} from 'react-native';
import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons/faArrowLeft';

type goBackProps = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    navigation: any;
    color: string;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
const GoBackButton = (props: goBackProps): React.ReactElement => {
    return (
        <Pressable onPress={(): void => {props.navigation.goBack();}}>
            <FontAwesomeIcon color={props.color} icon={faArrowLeft} size={20} />
        </Pressable>
    );
};

export default GoBackButton;
