/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
    ScrollView,
    View
} from 'react-native';
import React from 'react';
import ScannedItemLine from './ScannedItemLine';
import {TABLESTYLES} from '../../style/tablesStyle';

type ScannedItemTableProps = {
    loading: boolean;
    rack_id: number;
    rack_level: number;
    items: {
        id: number;
        serial_number: string;
        brand: {
            name: string;
        };
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
                    brand={item.brand.name}
                    created_at={item.created_at}
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
        <View style={TABLESTYLES.wrapper}>
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
