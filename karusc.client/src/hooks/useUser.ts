import { useContext } from "react";
import { LoggedInUserContext } from "../context/UserContext";

export const useUserContext = () => useContext(LoggedInUserContext);

