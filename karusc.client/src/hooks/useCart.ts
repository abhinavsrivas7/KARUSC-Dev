import { useContext } from "react";
import { UserCartContext } from "../context/CartContext";

export const useCartContext = () => useContext(UserCartContext);