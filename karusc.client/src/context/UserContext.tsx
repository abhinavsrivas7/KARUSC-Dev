import { ReactNode, createContext, useEffect, useState } from "react";
import { StorableUser, Token, User } from "../models/UserModels";
import { getUserFromToken, loadUserFromLocalStorage, localStorageKeyName } from "../utilities/ContextUtils";

type LoggedInUserProviderProps = {
    children: ReactNode
};

type UserContext = {
    getUser: () => User | null,
    setUserFromToken: (tokens: Token[]) => void,
    logOut: () => void
};

export const LoggedInUserContext = createContext({} as UserContext);

export function LoggedInUserProvider({ children }: LoggedInUserProviderProps) {
    const user = loadUserFromLocalStorage();
    console.log("component reloaded and value is " + JSON.stringify(user));
    const [storableUser, setStorableUser] = useState<StorableUser | null>(user);

    const getUser = () => storableUser?.user ?? null;

    const setUserFromToken = (tokens: Token[]) => {
        console.log("Reached")
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

    //useEffect(() => {
    //    const user = loadUserFromLocalStorage();
    //    if (user) {
    //        setStorableUser(user);
    //    }
    //});

    useEffect(() => {
        if (storableUser) {
            localStorage.setItem(localStorageKeyName, JSON.stringify(storableUser));
        }
        else {
            localStorage.removeItem(localStorageKeyName);
        }
    }, [storableUser]);

    return (
        <LoggedInUserContext.Provider value={{ getUser, setUserFromToken, logOut }}>
            {children}
        </LoggedInUserContext.Provider>
    );
}