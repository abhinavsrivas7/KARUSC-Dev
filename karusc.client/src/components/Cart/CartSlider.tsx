import { Button, Offcanvas, Stack, Image as ImageBs } from "react-bootstrap";
import closeImg from "../../../resources/media/close.svg";
import deleteImg from "../../../resources/media/delete.svg";
import { useCartContext } from "../../hooks/useCart";
import { useState } from "react";
import { DissmissableAlert } from "../Common/DissmissableAlert";
import { Loader } from "../Common/Loader";
import { QuantityButtons } from "../Common/QuantityButtons";
import { FormatProductPrice } from "../../utilities/ProductCardUtils";
import { useScreenSize } from "../../hooks/useScreenSize";
import { DeviceTypes } from "../../models/DeviceTypes";

type CartSliderProps = {
    show: boolean,
    onClose: () => void
}

export const CartSlider = ({ show, onClose }: CartSliderProps) => {
    const { getCart, removeFromCart, re } = useCartContext();
    const cart = getCart();
    const [showLoader, setShowLoader] = useState<boolean>(false);
    const [showError, setShowError] = useState<boolean>(false);
    const [errorDescription, setErrorDescription] = useState<string | null>(null);
    const { getDeviceType } = useScreenSize();

    const handleDelete = (lineItemId: string) => {
        setShowLoader(true);

        removeFromCart(lineItemId)
            .then(response => {
                if (typeof response === "string") {
                    setErrorDescription(response);
                    setShowError(true);
                }

                setShowLoader(false);
            });
    };

    const getTotalValue = () => {
        let sum = 0;
        cart.lineItems.forEach(lineItem => sum += lineItem.product.price * lineItem.quantity);
        return FormatProductPrice(sum);
    };

    return <Offcanvas
        placement="end"
        className="light-pink"
        show={show}
        onHide={() => { re(); onClose(); }}>
        <Offcanvas.Header>
            <h3 className="bold-font">Cart</h3>
            <Button
                onClick={() => { re(); onClose(); }}
                className="pt-0"
                variant="white"
                style={{ border: '0' }}>
                <img src={closeImg} />
            </Button>
        </Offcanvas.Header>
        <Offcanvas.Body className="pt-0" style={{ position: "relative" }}>
            {showError ? <DissmissableAlert description={errorDescription} title="Error in removing item from cart." variant="danger" /> : null}
            {cart.lineItems.map(lineItem => <Stack
                className="p-2 frost-card mb-4 pe-0"
                direction="horizontal"
                key={lineItem.id}
                gap={2}>
                <div>
                    <ImageBs
                        height={getDeviceType() === DeviceTypes.MINI_MOBILE
                            ? "70vh"
                            : "90vh"}
                        src={lineItem.product.images[0]} />
                </div>
                <Stack direction="vertical" gap={1}
                    className={getDeviceType() === DeviceTypes.MINI_MOBILE
                    ? "" : "ms-1"}>
                    <div className="bold-font">
                        {lineItem.product.title}
                    </div>
                    <div className="semi-bold-font">
                        {FormatProductPrice(lineItem.product.price * lineItem.quantity)}
                    </div>
                    <div className={getDeviceType() === DeviceTypes.MINI_MOBILE
                        ? "regular-font px-0"
                        : "regular-font px-1"}>
                        <QuantityButtons productId={lineItem.product.id} quantity={lineItem.quantity} />
                    </div>
                </Stack>
                <div>
                    {showLoader
                        ? <Loader />
                        : <Button
                            variant="white"
                            onClick={() => handleDelete(lineItem.id)}>
                        <img src={deleteImg} height="25" />
                    </Button>}
                </div>
            </Stack>)}
            <div
                style={{ bottom: 20, position: "absolute", width: "90%" }}>
                <Stack direction="vertical" gap={1} className="ps-2 pe-2">
                    <div className="d-flex justify-content-between bold-font">
                        <span><h4>Subtotal</h4></span>
                        <span><h4>{getTotalValue()}</h4></span>
                    </div>
                    <Button size="lg" className="admin-button semi-bold-font">
                        Checkout
                    </Button>
                </Stack>
            </div>
        </Offcanvas.Body>
    </Offcanvas>;
}