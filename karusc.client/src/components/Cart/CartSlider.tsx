import { Button, Offcanvas, Stack, Image as ImageBs, OverlayTrigger, Tooltip } from "react-bootstrap";
import closeImg from "../../../resources/media/close.svg";
import infoImg from "../../../resources/media/info.svg";
import deleteImg from "../../../resources/media/delete.svg";
import { useCartContext } from "../../hooks/useCart";
import { useState } from "react";
import { DissmissableAlert } from "../Common/DissmissableAlert";
import { Loader } from "../Common/Loader";
import { QuantityButtons } from "../Common/QuantityButtons";
import { FormatProductPrice } from "../../utilities/ProductCardUtils";
import { useScreenSize } from "../../hooks/useScreenSize";
import { DeviceTypes } from "../../models/DeviceTypes";
import { LoginModal } from "../Authentication/LoginModal";
import { useUserContext } from "../../hooks/useUser";
import { useNavigate } from "react-router-dom";
import { StorableUser } from "../../models/UserModels";
import { AddLineItemsToUserCart, fetchCartForUser } from "../../utilities/ContextUtils";

type CartSliderProps = {
    show: boolean,
    onClose: () => void
}

export const CartSlider = ({ show, onClose }: CartSliderProps) => {
    const { getCart, removeFromCart, reLoad, setCartState } = useCartContext();
    const { getUser } = useUserContext();
    const navigate = useNavigate();
    const cart = getCart();
    const [showLoader, setShowLoader] = useState<boolean>(false);
    const [showError, setShowError] = useState<boolean>(false);
    const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
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
                reLoad();
                setShowLoader(false);
            });
    };

    const getTotalValue = () => {
        let sum = 0;
        cart.lineItems.forEach(lineItem => sum += lineItem.product.price * lineItem.quantity);
        return FormatProductPrice(sum);
    };

    const onClosing = () => {
        reLoad();
        onClose();
    };

    const handleCheckout = () => {
        if (getUser() === null) {
            setShowLoginModal(true);
        } else {
            onClosing();
            navigate("/Checkout");
        }
    };

    const infoButton = <OverlayTrigger
        trigger="click"
        placement="top"
        rootClose={true}
        rootCloseEvent="click"
        overlay={<Tooltip>Shipping and discounts will be calculated at checkout.</Tooltip >}>
        <sup><img src={infoImg} height="15"></img></sup>
    </OverlayTrigger>;

    const cartHasItemsLayout = <>
        {showError ? <DissmissableAlert description={errorDescription} title="Error in removing item from cart." variant="danger" /> : null}
        {cart.lineItems.map(lineItem => <Stack
            className="p-2 frost-card mb-4 pe-0"
            direction="horizontal"
            key={lineItem.id}
            gap={2}>
            <div>
                <ImageBs
                    height={getDeviceType() === DeviceTypes.MINI_MOBILE
                        ? "65vh"
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
                    <span><h4>Subtotal {infoButton}</h4></span>
                    <span><h4>{getTotalValue()}</h4></span>
                </div>
                <Button size="lg" className="admin-button semi-bold-font" onClick={handleCheckout}>
                    Checkout
                </Button>
            </Stack>
        </div>
    </>;

    const cartIsEmptyLayout = <div style={{ position: "absolute", bottom: "50%", width: "90%" }}    >
        <Stack direction="vertical" className="d-flex justify-content-center align-items-center" gap={3}>
            <div><h5 className="regular-font">Your cart is empty</h5></div>
            <div><Button variant="lg" onClick={onClosing} className="admin-button">Continue Shopping</Button></div>
        </Stack>
    </div>;

    const onModalLogin = (user: StorableUser) => {
        const unchangedCart = cart;

        fetchCartForUser(user.tokens)
            .then(response => {
                if (typeof response !== "string") {
                    setCartState(response);
                    AddLineItemsToUserCart(user.tokens, unchangedCart)
                        .then(res => {
                            if (typeof res !== "string") {
                                setCartState(res);
                            }
                        });
                }
            });
    };

    return <>
        <Offcanvas
            placement="end"
            className="light-pink"
            show={show}
            onHide={onClosing}>
            <Offcanvas.Header>
                <h3 className="bold-font">Cart</h3>
                <Button
                    onClick={onClosing}
                    className="pt-0"
                    variant="white"
                    style={{ border: '0' }}>
                    <img src={closeImg} />
                </Button>
            </Offcanvas.Header>
            <Offcanvas.Body className="pt-0" style={{ position: "relative" }}>
                {cart.lineItems.length > 0 ? cartHasItemsLayout : cartIsEmptyLayout};
            </Offcanvas.Body>
        </Offcanvas>
        <LoginModal show={showLoginModal} onHide={() => setShowLoginModal(false)} onLogin={onModalLogin} />
    </>;
}