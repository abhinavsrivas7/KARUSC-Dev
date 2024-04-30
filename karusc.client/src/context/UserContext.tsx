import { ReactNode, createContext, useEffect, useState } from "react";
import { StorableUser, Token, User } from "../models/UserModels";
import { cartKeyName, getUserFromToken, loadUserFromLocalStorage, performLogOut, userKeyName } from "../utilities/ContextUtils";

type LoggedInUserProviderProps = {
    children: ReactNode
};

type UserContext = {
    getUser: () => User | null,
    getToken: () => Token[] | null,
    setUserFromToken: (tokens: Token[]) => StorableUser | undefined,
    logOut: () => void
};

export const LoggedInUserContext = createContext({} as UserContext);

export function LoggedInUserProvider({ children }: LoggedInUserProviderProps) {
    const user = loadUserFromLocalStorage();
    const [storableUser, setStorableUser] = useState<StorableUser | null>(user);

    const getUser = () => storableUser?.user ?? null;
    const getToken = () => storableUser?.tokens ?? null;

    const setUserFromToken = (tokens: Token[]) => {
        if (storableUser === null) {
            const user = getUserFromToken(tokens);
            setStorableUser(user);
            localStorage.removeItem(cartKeyName);
            return user;
        }
    };

    const logOut = () => {
        if (storableUser !== null) {
            setStorableUser(null);
        }
    };

    useEffect(() => {
        if (storableUser) {
            localStorage.setItem(userKeyName, JSON.stringify(storableUser));
        }
        else {
            performLogOut();
        }
    }, [storableUser]);

    return (
        <LoggedInUserContext.Provider value={{ getUser, setUserFromToken, logOut, getToken }}>
            {children}
        </LoggedInUserContext.Provider>
    );
}