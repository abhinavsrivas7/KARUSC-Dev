export type Product = {
    id: string
    title: string
    price : number
    description : string
    category: string
    collection: string
    images :string []  
};

export type CreateProductCommand = {
    title: string;
    price: number;
    description: string;
    images: string[];
    categories: string[];
    collections: string[];
}

