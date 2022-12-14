/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
    ScrollView,
    View
} from 'react-native';
import React from 'react';
import {TABLESTYLES} from '../../style/tablesStyle';
import ScannedProductLine from './ScannedProductLine';

type ScannedProductTableProps = {
    loading: boolean;
    rack_id: number;
    rack_level: number;
    products: {
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
const ScannedProductTable = (props: ScannedProductTableProps): React.ReactElement => {

    function renderProducts(): React.ReactElement[] {
        const SCANNEDPRODUCTSLINES: React.ReactElement[] = [];

        props.products.forEach((product, index): void => {
            SCANNEDPRODUCTSLINES.push(
                <ScannedProductLine
                    id={product.id}
                    key={index}
                    brand={product.brand.name}
                    created_at={product.created_at}
                    keyI={index}
                    serialNumber={product.serial_number}
                    model={product.model}
                    rack_id={props.rack_id}
                    rack_level={props.rack_level}
                    category={product.category.name}
                    remove={props.remove}
                />
            );
        });
        return SCANNEDPRODUCTSLINES;
    }

    return (
        <View style={TABLESTYLES.wrapper}>
            <ScannedProductLine
                    id={0}
                    head={true}
                    category={'Catégorie'}
                    model={'Modèle'}
                    serialNumber={'N° série'}
            />
            <ScrollView>
                {renderProducts()}
            </ScrollView>
        </View>
    );
};


export default ScannedProductTable;
