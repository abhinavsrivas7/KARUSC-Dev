export type CreateProductCommand = {
    title: string;
    price: number;
    description: string;
    images: string[];
    categories: string[];
    collections: string[];
}