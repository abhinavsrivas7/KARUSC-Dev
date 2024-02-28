export type Product = {
    id: string
    title: string
    price : number
    description: string
    careInstructions: string
    category: string
    collection: string
    images :string []  
};

export type CreateProductCommand = {
    title: string;
    price: number;
    description: string;
    careInstructions: string;
    images: string[];
    categories: string[];
    collections: string[];
}

