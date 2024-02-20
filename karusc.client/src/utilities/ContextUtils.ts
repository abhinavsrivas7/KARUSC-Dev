/* eslint-disable @typescript-eslint/no-explicit-any */
import { DeviceTypes } from "../models/DeviceTypes";
import { Role, StorableUser, Token } from "../models/UserModels";
import { jwtDecode } from "jwt-decode";


export const localStorageKeyName = "karusUser";

export const loadUserFromLocalStorage = (): StorableUser | null => {
    const value = localStorage.getItem(localStorageKeyName);

    return value !== null
        ? JSON.parse(value) as StorableUser
        : null;
}

export const getDeviceName = (width: number) => width < 768 ? DeviceTypes.MOBILE
    : width >= 768 && width < 1024 ? DeviceTypes.TABLET
        : DeviceTypes.DESKTOP;

export const getUserFromToken = (tokens: Token[]): StorableUser => {
    const accessToken = tokens
        .find(token => token.tokenType == "AccessToken")?.tokenValue
        ?? "";

    const payload = jwtDecode(accessToken) as any;

    return {
        tokens: tokens,
        user: {
            email: payload.email,
            name: payload.role,
            profilePicture: payload.profilepictureurl,
            role: payload.role == "Administrator" ? Role.Administrator : Role.Customer
        }
    }
}