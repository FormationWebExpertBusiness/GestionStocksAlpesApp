import {View} from 'react-native';
import React from 'react';
import {ALMOST_BLACK, BUTTONRED} from '../../../style/colors';
import {Skeleton} from '@rneui/themed';
import {LINESTYLES} from '../../../style/tablesStyle';
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons/faMagnifyingGlass';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faXmark} from '@fortawesome/free-solid-svg-icons/faXmark';

type LineSkeletonProps = {
    animation?: 'pulse' | 'wave';
    remove?: boolean;
  };

const LineSkeleton = (props: LineSkeletonProps): React.ReactElement => {

    function renderIcon(): React.ReactElement {
        if(!props.remove) {
            return (
                <View style={LINESTYLES.icon}>
                    <FontAwesomeIcon color={ALMOST_BLACK} icon={faMagnifyingGlass} size={12} />
                </View>
            );
        }
        return (
            <View style={[LINESTYLES.icon, LINESTYLES.iconDeletion]}>
                <FontAwesomeIcon color={BUTTONRED} icon={faXmark} size={15} />
            </View>
        );
    }

    function getAnimation(): 'none' | 'pulse' | 'wave' {
        if(props.animation) {
            return props.animation;
        }
        return 'none';
    }

    return (
        <View style={[LINESTYLES.wrapper, LINESTYLES.evenWrapper]}>
            <View style={LINESTYLES.text}>
                <Skeleton animation={getAnimation()} height={25} style={{borderRadius: 3}}/>
            </View>
            <View style={LINESTYLES.text}>
                <Skeleton animation={getAnimation()} height={25} style={{borderRadius: 3}}/>
            </View>
            <View style={LINESTYLES.text}>
                <Skeleton animation={getAnimation()} height={25} style={{borderRadius: 3}}/>
            </View>
            {renderIcon()}
        </View>
    );
};


export default LineSkeleton;
