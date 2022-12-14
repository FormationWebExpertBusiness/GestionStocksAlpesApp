export type Product = {
    id: number;
    serial_number: string;
    rack: {
        id: number;
        name: string;
    };
    rack_level: number;
    created_at: string;
    comment: string;
};
