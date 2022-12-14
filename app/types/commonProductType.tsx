import type {Product} from './ProductType';

export type CommonProduct = {
    id: number;
    model: string;
    quantity: number;
    quantity_critical: number;
    quantity_low: number;
    brand: {
        name: string;
    };
    category: {
        name: string;
    };
    products: Product[];
};
