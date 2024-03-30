import { Category } from "./CategoryModels";
import { Collection } from "./CollectionModels";

export type Product = {
    id: string
    title: string
    price : number
    description: string
    careInstructions: string
    categories: Category[]
    collections: Collection[]
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

export type ProductListFilter = {
    id: string,
    name: string
}

