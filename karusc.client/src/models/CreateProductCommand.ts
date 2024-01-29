export type CreateProductCommand = {
    title: string;
    price: number;
    description: string;
    images: unknown[];
    categories: string[];
    collections: string[];
}