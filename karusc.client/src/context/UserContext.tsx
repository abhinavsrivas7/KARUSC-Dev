import { ReactNode, createContext, useEffect, useState } from "react";
import { StorableUser, Token, User } from "../models/UserModels";
import { getUserFromToken, loadUserFromLocalStorage, localStorageKeyName } from "../utilities/ContextUtils";

type LoggedInUserProviderProps = {
    children: ReactNode
};

type UserContext = {
    getUser: () => User | null,
    getToken: () => Token[] | null,
    setUserFromToken: (tokens: Token[]) => void,
    logOut: () => void
};

export const LoggedInUserContext = createContext({} as UserContext);

export function LoggedInUserProvider({ children }: LoggedInUserProviderProps) {
    const user = loadUserFromLocalStorage();
    const [storableUser, setStorableUser] = useState<StorableUser | null>(user);

    const getUser = () => storableUser?.user ?? null;
    const getToken = () => storableUser?.tokens ?? null;
    console.log(getToken);

    const setUserFromToken = (tokens: Token[]) => {
        if (storableUser === null) {
            const user = getUserFromToken(tokens);
            setStorableUser(user);
        }
    };

    const logOut = () => {
        if (storableUser !== null) {
            setStorableUser(null);
        }
    };

    useEffect(() => {
        if (storableUser) {
            localStorage.setItem(localStorageKeyName, JSON.stringify(storableUser));
        }
        else {
            localStorage.removeItem(localStorageKeyName);
        }
    }, [storableUser]);

    return (
        <LoggedInUserContext.Provider value={{ getUser, setUserFromToken, logOut, getToken }}>
            {children}
        </LoggedInUserContext.Provider>
    );
}