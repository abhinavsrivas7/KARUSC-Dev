import { ReactNode, useContext, createContext, useState, useEffect } from "react";

type ScreenSizeProviderProps = {
    children: ReactNode
}

type ScreenSizecontext = {
    checkIfMobile: () => boolean
}

const ScreenSizeContext = createContext({} as ScreenSizecontext)
export function useScreenSize() {
    return useContext(ScreenSizeContext)
}

export function ScreenSizeProvider({ children }: ScreenSizeProviderProps) {
    const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const checkIfMobile = () => isMobile;

    return (
        <ScreenSizeContext.Provider value={{ checkIfMobile }}>
            {children}
        </ScreenSizeContext.Provider>
    )
}