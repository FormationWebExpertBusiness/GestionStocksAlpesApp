export type ScannedProduct = {
    id: number;
    serial_number: string;
    model: string;
    brand: {
        id: number;
        name: string;
    };
    category: {
        id: number;
        name: string;
    };
    created_at: string;
    comment: string;
};
