import { ReactNode, createContext, useState, useEffect } from "react";
import { DeviceTypes } from "../models/DeviceTypes";
import { getDeviceName } from "../utilities/ContextUtils";

type ScreenSizeProviderProps = {
    children: ReactNode
}

type ScreenSizecontext = {
    getDeviceType: () => DeviceTypes
}

export const ScreenSizeContext = createContext({} as ScreenSizecontext)

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