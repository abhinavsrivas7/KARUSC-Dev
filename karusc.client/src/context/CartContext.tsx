import { ReactNode, createContext, useEffect, useState } from "react";
import { AddToCartCommand, Cart, UpdateLineItemCommand } from "../models/CartModels";
import { getCartFromLocalStorage, getGuestUserCart, performCartOperation } from "../utilities/ContextUtils";
import { useUserContext } from "../hooks/useUser";
import { Product } from "../models/ProductModels";
import { CartEndpoint } from "../utilities/EndpointUtils";

const maxCartItems = import.meta.env.VITE_REACT_APP_MAX_CART_ITEMS;
const maxLineItemQuantity = import.meta.env.VITE_REACT_APP_MAX_ITEM_QUANTIY;

type CartProviderProps = {
    children: ReactNode
};

type CartContext = {
    getCart: () => Cart,
    re: () => void,
    addToCart: (product: Product) => Promise<Cart | string>,
    updateLineItem: (lineItemid: string, incrementQuantity: number) => Promise<Cart | string>,
    removeFromCart: (lineItemId: string) => Promise<Cart | string>
};

export const UserCartContext = createContext({} as CartContext);

export function CartProvider({ children }: CartProviderProps) {
    const { getUser, getToken } = useUserContext();
    const user = getUser();
    const tokens = getToken();
    const [cart, setCart] = useState<Cart>(getGuestUserCart());
    const [t, setT] = useState<boolean>(false);

    useEffect(() => {
        getCartFromLocalStorage(user, tokens).then(cartResponse => alertOrSet(cartResponse))
    }, [user, tokens]);

    const alertOrSet = (result: Cart | string) => {
        if (typeof result === "string") alert(result);
        else setCart(result);
    }

    const performOperation = (
        payload: AddToCartCommand | UpdateLineItemCommand | string,
        method: "POST" | "PATCH" | "DELETE",
        alternateOperation: (cart: Cart) => Cart): Promise<Cart | string> => {
            return new Promise<Cart | string>(resolve => {
                performCartOperation(user, cart, {
                    method: method,
                    payload: payload,
                    url: CartEndpoint(),
                    alternateOperation: alternateOperation,
                    tokens: tokens
                }).then(result => resolve(result));
            });
    };

    const getCart = () => cart;
    const re = () => setT(!t);

    const addToCart = (product: Product) => {
        const lineItem = cart.lineItems.find(lineItem => lineItem.product.id === product.id);

        if (cart.lineItems.length >= maxCartItems) {
            return Promise.resolve("Cart items limit reached.");
        }
        else if (lineItem !== undefined) {
            return Promise.resolve("Product already exists in cart.");
        }
        else {
            return new Promise <Cart | string>(resolve => {
                performOperation(
                    { productId: product.id }, "POST",
                    (cart) => {
                        cart.lineItems.push({
                            id: `${cart.lineItems.length}`,
                            product: product,
                            quantity: 1
                        });
                        return cart;
                    }
                ).then(result => {
                    if (typeof result !== "string") setCart(result);
                    resolve(result)
                });
            })
            ;
        }
    };

    const updateLineItem = (lineItemId: string, incrementQuantity: number) => {
        const lineItem = cart.lineItems.find(lineItem => lineItem.id == lineItemId);

        if (lineItem === undefined) {
            return Promise.resolve("Line item with the specified id doesnt exiwst in the cart.");
        }
        else if (lineItem.quantity + incrementQuantity > maxLineItemQuantity ||
                 lineItem.quantity + incrementQuantity < 1) {
            return Promise.resolve("Quantity limit reached");
        }
        else {
            return new Promise<Cart | string>(resolve => {
                performOperation({ lineItemId: lineItemId, incrementQuantity: incrementQuantity }, "PATCH",
                    (cart) => {
                        cart.lineItems.forEach(li => {
                            if (li.id === lineItemId) li.quantity += incrementQuantity;
                        });
                        return cart;
                    }
                ).then(result => {
                    if (typeof result !== "string") setCart(result);
                    resolve(result)
                });
            });
        }
    };

    const removeFromCart = async (lineItemId: string) => {
        const lineItem = cart.lineItems.find(lineItem => lineItem.id == lineItemId);

        if (lineItem === undefined) {
            return Promise.resolve("Line item with the specified id doesnt exist in the cart.");
        }
        else {
            return new Promise<Cart | string>(resolve => {
                performOperation(lineItemId, "DELETE",
                    (cart) => {
                        cart.lineItems = cart.lineItems.filter(lineItem => lineItem.id !== lineItemId);
                        return cart;
                    }
                ).then(result => {
                    if (typeof result !== "string") setCart(result);
                    resolve(result)
                });
            });
        }        
    };


    return (
        <UserCartContext.Provider value={{ getCart, addToCart, updateLineItem, removeFromCart, re }}>
            {children}
        </UserCartContext.Provider>
    );
}