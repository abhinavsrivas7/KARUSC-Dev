/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { Cart, CartApiOperation } from "../models/CartModels";
import { DeviceTypes } from "../models/DeviceTypes";
import { Role, StorableUser, Token, User } from "../models/UserModels";
import { jwtDecode } from "jwt-decode";
import { CartEndpoint } from "./EndpointUtils";


export const userKeyName = "karusUser";
const cartKeyName = "karusCart";
const guestCartId = "GUEST-CART-ID";

export const loadUserFromLocalStorage = (): StorableUser | null => {
    const value = localStorage.getItem(userKeyName);

    return value !== null
        ? JSON.parse(value) as StorableUser
        : null;
}

export const getDeviceName = (width: number) => width < 300
    ? DeviceTypes.MINI_MOBILE
    : width < 768
    ? DeviceTypes.MOBILE
    : width >= 768 && width < 1024
    ? DeviceTypes.TABLET
    : DeviceTypes.DESKTOP;

export const getUserFromToken = (tokens: Token[]): StorableUser => {
    const accessToken = tokens
        .find(token => token.tokenType == "AccessToken")?.tokenValue
        ?? "";

    const payload = jwtDecode(accessToken) as any;

    return {
        tokens: tokens,
        user: {
            id: payload.id,
            email: payload.email,
            name: payload.name,
            profilePictureUrl: payload.profilepictureurl,
            role: payload.role == "Administrator" ? Role.Administrator : Role.Customer
        }
    }
}

export const getGuestUserCart = () => {
    const value = localStorage.getItem(cartKeyName);
    if (value) {
        const cart = JSON.parse(value) as Cart;
        return cart;
    }
    
    return {
        id: guestCartId,
        lineItems: [],
        ownerId: "",
        totalAmount: 0
    };
}

export const performLogOut = () => {
    localStorage.removeItem(userKeyName);
    localStorage.setItem(cartKeyName, JSON.stringify(getGuestUserCart()));
}

export const getCartFromLocalStorage = (user: User | null, tokens: Token[] | null): Promise<Cart | "Invalid Tokens"> => {
    const value = localStorage.getItem(cartKeyName);
    
    if (user !== null && value !== null) {
        const cart = JSON.parse(value) as Cart;

        return cart.ownerId == user.id
            ? Promise.resolve(cart)
            : new Promise<Cart | "Invalid Tokens">(
                resolve => fetchCartForUser(tokens).then(cart => {
                    localStorage.removeItem(cartKeyName);
                    resolve(cart);
                }));
    }
    else if (user === null && value !== null) {
        console.log("reaching here");
        const cart = JSON.parse(value) as Cart;

        if (cart.id === guestCartId) {
            console.log("reaching here 2");
            console.log(cart);
            return Promise.resolve(cart);
        }

        const guestCart = getGuestUserCart();
        localStorage.setItem(cartKeyName, JSON.stringify(guestCart));
        return Promise.resolve(guestCart);
    }
    else if (user !== null && value === null) {
        return new Promise<Cart | "Invalid Tokens">(
            resolve => fetchCartForUser(tokens).then(cart => {
                localStorage.removeItem(cartKeyName);
                resolve(cart);
            }));
    }
    else {
        const guestCart = getGuestUserCart();
        localStorage.setItem(cartKeyName, JSON.stringify(guestCart));
        return Promise.resolve(guestCart);
    }
}

const fetchCartForUser = (tokens: Token[] | null): Promise<Cart | "Invalid Tokens"> => {
    const tokenResponse = validateTokens(tokens);
    if (tokenResponse === false) return Promise.resolve("Invalid Tokens");
    return new Promise<Cart>(resolve => {
        axios
            .get(CartEndpoint(), {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${tokenResponse}`
                }
            })
            .then(response => resolve(response.data));
    })
}

const validateTokens = (tokens: Token[] | null): string | false => {
    if (tokens === null || tokens.length !== 2) {
        return false;
    }

    const accessToken = tokens.find(token => token.tokenType === "AccessToken")?.tokenValue;

    if (accessToken === undefined) {
        return false;
    }

    return accessToken;
};

export const performCartOperation = (
    user: User | null,
    cart: Cart,
    operation: CartApiOperation): Promise<Cart | string> => {
    let updatedCart: Cart | string = "";
    const tokenResponse = validateTokens(operation.tokens);
    if (user !== null && tokenResponse === false) return Promise.resolve("Invalid Tokens");
        
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tokenResponse}`
    };

    if (user !== null) {
        return new Promise<Cart | string>((resolve) => {
            switch (operation.method) {
                case "POST": axios
                    .post(operation.url, operation.payload, { headers: headers })
                    .then(response => {
                        updatedCart = response.data;
                        resolve(updatedCart);
                    })
                    .catch(() => {
                        updatedCart = "Some error occured in adding the product to cart.";
                        resolve(updatedCart);
                    });
                    break;
                case "DELETE": axios
                    .delete(`${operation.url}/${operation.payload}`, { headers: headers })
                    .then(response => {
                        updatedCart = response.data;
                        resolve(updatedCart);
                    })
                    .catch(() => {
                        updatedCart = "Some error occured in removeing the line item from cart.";
                        resolve(updatedCart);
                    });
                    break;
                case "PATCH": axios
                    .patch(operation.url, operation.payload, { headers: headers })
                    .then(response => {
                        updatedCart = response.data;
                        resolve(updatedCart);
                    })
                    .catch(() => {
                        updatedCart = "Some error occured in changing line item quantity.";
                        resolve(updatedCart);
                    });
                    break;
            }
        })
    }
    else {
        updatedCart = operation.alternateOperation(cart);
        localStorage.setItem(cartKeyName, JSON.stringify(updatedCart));
        return Promise.resolve(updatedCart);
    }
}