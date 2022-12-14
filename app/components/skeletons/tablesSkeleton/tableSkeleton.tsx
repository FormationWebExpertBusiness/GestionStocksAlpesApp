import {View} from 'react-native';
import React from 'react';
import CommonProductLine from '../../commonProductTable/CommonProductLine';
import {TABLESTYLES} from '../../../style/tablesStyle';
import LineSkeleton from './lineSkeleton';

type TableSkeletonProps = {
    number: number;
    remove?: boolean;
    animation?: 'pulse' | 'wave';
    title1: string;
    title2: string;
    title3: string;
  };

const TableSkeleton = (props: TableSkeletonProps): React.ReactElement => {

    function renderSkeletons(): React.ReactElement[] {
        const skeletons: React.ReactElement[] = [];
        for(let i = 0; i < props.number; i++) {
            skeletons.push(
                <LineSkeleton
                    key={i}
                    animation={props.animation}
                    remove={props.remove}
                />
            );
        }
        return skeletons;
    }

    return (
        <View style={TABLESTYLES.wrapper}>
            <CommonProductLine
                head={true}
                category={props.title1}
                model={props.title2}
                brand={props.title3}
            />
            {renderSkeletons()}
        </View>
    );
};


export default TableSkeleton;
