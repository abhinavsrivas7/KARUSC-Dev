import { Product } from "./ProductModels";
import { Token } from "./UserModels";

export type Cart = {
    id: string,
    ownerId: string,
    lineItems: LineItem[],
    totalAmount: number
};

export type LineItem = {
    id: string,
    product: Product,
    quantity: number
};

export type AddToCartCommand = {
    productId: string
};

export type UpdateLineItemCommand = {
    lineItemId: string,
    incrementQuantity: number
};

export type CartApiOperation = {
    url: string,
    payload: AddToCartCommand | UpdateLineItemCommand | string,
    method: "POST" | "PATCH" | "DELETE",
    alternateOperation: (cart: Cart) => Cart,
    tokens: Token[] | null
};