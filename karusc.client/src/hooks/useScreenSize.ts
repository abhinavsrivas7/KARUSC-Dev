import { useContext } from "react";
import { ScreenSizeContext } from "../context/ScreenSizeContext";

export const useScreenSize = () => useContext(ScreenSizeContext);