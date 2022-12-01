/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
    ScrollView,
    View,
    StyleSheet
} from 'react-native';
import React from 'react';
import ScannedItemLine from './ScannedItemLine';
import {DARKBLUEBLACK} from '../../style/colors';

const STYLES = StyleSheet.create({
    wrapper: {
        marginTop: 20,
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5,
        shadowColor: DARKBLUEBLACK,
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowOpacity:  0.16,
        shadowRadius: 1.51,
        elevation: 2
    }
});

type ScannedItemTableProps = {
    loading: boolean;
    rack_id: number;
    rack_level: number;
    items: {
        id: number;
        serial_number: string;
        category: {
            name: string;
        };
        comment: string;
        created_at: string;
        model: string;
    }[];
    remove?: boolean;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
const ScannedItemTable = (props: ScannedItemTableProps): React.ReactElement => {

    function renderItems(): React.ReactElement[] {
        const SCANNEDITEMSLINES: React.ReactElement[] = [];

        props.items.forEach((item, index): void => {
            SCANNEDITEMSLINES.push(
                <ScannedItemLine
                    id={item.id}
                    key={index}
                    keyI={index}
                    serialNumber={item.serial_number}
                    model={item.model}
                    rack_id={props.rack_id}
                    rack_level={props.rack_level}
                    category={item.category.name}
                    remove={props.remove}
                />
            );
        });
        return SCANNEDITEMSLINES;
    }

    return (
        <View style={STYLES.wrapper}>
            <ScannedItemLine
                    id={0}
                    head={true}
                    category={'Catégorie'}
                    model={'Modèle'}
                    serialNumber={'N° série'}
            />
            <ScrollView>
                {renderItems()}
            </ScrollView>
        </View>
    );
};


export default ScannedItemTable;