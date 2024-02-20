import { ReactNode, useContext, createContext, useState, useEffect } from "react";
import { DeviceTypes } from "../models/DeviceTypes";
import { getDeviceName } from "../utilities/ContextUtils";

type ScreenSizeProviderProps = {
    children: ReactNode
}

type ScreenSizecontext = {
    getDeviceType: () => DeviceTypes
}

const ScreenSizeContext = createContext({} as ScreenSizecontext)

// eslint-disable-next-line react-refresh/only-export-components
export const useScreenSize = () => useContext(ScreenSizeContext);

export function ScreenSizeProvider({ children }: ScreenSizeProviderProps) {
    const [deviceType, setDeviceType] = useState<DeviceTypes>(getDeviceName(window.innerWidth));
    const handleResize = () => setDeviceType(getDeviceName(window.innerWidth));
    const getDeviceType = () => deviceType;

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <ScreenSizeContext.Provider value={{ getDeviceType }}>
            {children}
        </ScreenSizeContext.Provider>
    )
}