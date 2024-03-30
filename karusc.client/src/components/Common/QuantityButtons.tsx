import { Button, Stack } from "react-bootstrap";
import { useCartContext } from "../../hooks/useCart";
import { useState } from "react";
import { Loader } from "./Loader";
import { DissmissableAlert } from "./DissmissableAlert";
import plusImg from "../../../resources/media/plus.svg";
import minusImg from "../../../resources/media/minus.svg";

type QuantityButtonsProps = {
    productId: string,
    quantity: number
}

export const QuantityButtons = ({ productId, quantity }: QuantityButtonsProps) => {
    const maxLineItemQuantity = import.meta.env.VITE_REACT_APP_MAX_ITEM_QUANTIY;
    const { getCart, updateLineItem } = useCartContext();
    const [currentQuantity, setCurrentQuantity] = useState<number>(quantity);
    const [showLoader, setShowLoader] = useState<boolean>(false);
    const [showError, setShowError] = useState<boolean>(false);
    const [errorDescription, setErrorDescription] = useState<string | null>(null);
    const handleIncrement = (mode: "+" | "-") =>  {
        const lineItemId = getCart()
            .lineItems
            .find(lineItem => lineItem.product.id === productId)
            ?.id;

        setShowLoader(true);

        if (lineItemId) {
            updateLineItem(lineItemId, mode === "+" ? 1 : -1)
                .then(response => {
                    if (typeof response === "string") {
                        setErrorDescription(response);
                        setShowError(true);
                    }
                    else {
                        const updatedLineItem = response.lineItems
                            .find(lineItem => lineItem.id === lineItemId);
                        if (updatedLineItem) {
                            setCurrentQuantity(updatedLineItem.quantity);
                        }
                    }
                    setShowLoader(false);
                });
        }
    };

    const getQuantity = () => {
        const lineItem = getCart().lineItems
            .find(lineItem => lineItem.product.id === productId);

        if (lineItem) {
            if (currentQuantity !== lineItem.quantity) {
                setCurrentQuantity(lineItem.quantity);
            }           
            return lineItem.quantity;
        }

        return - 1;
    };

    return showError
        ? <DissmissableAlert
            title="Error in updating quantity"
            variant="danger"
            description={errorDescription} />
        : < Stack
            direction="horizontal"
            gap={0}>
            {showLoader
                ? <Loader />
                : <>
                    <Button
                        className="admin-button py-1"
                        onClick={() => handleIncrement("-")}
                        disabled={currentQuantity <= 1}>
                        <img src={minusImg} height="10"></img>
                    </Button>

                    <div className="purple semi-bold-font px-3 py-1 border-0">{getQuantity()}</div>
                    
                    <Button
                        className="admin-button py-1"
                        onClick={() => handleIncrement("+")}
                        disabled={currentQuantity >= maxLineItemQuantity}>
                        <img src={plusImg} height="10"></img>
                    </Button>
                </>}
        </Stack> ;
};