import type {Item} from './ItemType';

export type CommonItem = {
    id: number;
    model: string;
    quantity: number;
    quantity_urgent: number;
    quantity_warning: number;
    brand: {
        name: string;
    };
    category: {
        name: string;
    };
    items: Item[];
};
