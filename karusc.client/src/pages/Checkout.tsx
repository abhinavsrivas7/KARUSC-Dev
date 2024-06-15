import { Button, Col, Container, Dropdown, Image, OverlayTrigger, Row, Stack, Tooltip } from "react-bootstrap";
import addImg from "../../resources/media/circle-add-pink.svg";
import infoImg from "../../resources/media/info.svg";
import deleteImg from "../../resources/media/delete-circle.svg";
import editImg from "../../resources/media/edit-circle.svg";
import { useEffect, useState } from "react";
import { Address } from "../models/AddressModels";
import { useUserContext } from "../hooks/useUser";
import { useCartContext } from "../hooks/useCart";
import { useNavigate } from "react-router-dom";
import { useScreenSize } from "../hooks/useScreenSize";
import { DeviceTypes } from "../models/DeviceTypes";
import { FormatProductPrice } from "../utilities/ProductCardUtils";
import { QuantityButtons } from "../components/Common/QuantityButtons";
import { AddressModal } from "../components/Addresses/AddAddressModal";
import axios from "axios";
import { AddressEndpoint, GetAllAddressesEndpoint } from "../utilities/EndpointUtils";
import { validateTokens } from "../utilities/ContextUtils";
import { Loader } from "../components/Common/Loader";


type ResponsiveStyles = {
    contentWidth: string,
    checkoutMargin: string,
    dropdownWidth: string,
    dropdownLabelClass: string,
    dropdownRowItems: number,
};

const defaultShippingPrice = 300;

export const Checkout = () => {   
    const [responsive, setResponsive] = useState<ResponsiveStyles>({
        contentWidth: "100%",
        checkoutMargin: "mb-5",
        dropdownWidth: "100%",
        dropdownLabelClass: "mb-0",
        dropdownRowItems: 2
    });
    const [selectedShippingAddress, setSelectedShippingAddress] = useState<Address | null>(null);
    const [selectedBillingAddress, setSelectedBillingAddress] = useState<Address | null>(null);
    const [addressToUpdate, setAddressToUpdate] = useState<string | undefined>(undefined);
    const [showAddressModal, setShowAddressModal] = useState<boolean>(false);
    const [showLoader, setShowLoader] = useState<boolean>(false);
    const [isBillingAddressDifferent, setIsBillingAddressDifferent] = useState<boolean>();
    const [enablePayButton, setEnablePayButton] = useState<boolean>(selectedShippingAddress !== null && selectedBillingAddress !== null);
    const [addresses, setAddresses] = useState<Address[]>([]);
    const { getUser, getToken } = useUserContext();
    const { getCart } = useCartContext();
    const { getDeviceType } = useScreenSize();
    const navigate = useNavigate();

    useEffect(() => {
        const getIsBillingAddressDifferent = (): boolean => {
            if (
                (
                    selectedShippingAddress === null &&
                    selectedBillingAddress === null
                ) ||
                (
                    selectedShippingAddress !== null &&
                    selectedBillingAddress !== null &&
                    selectedShippingAddress.id === selectedBillingAddress.id
                )
            ) {
                return false;
            }
            else return true;
        };

        setIsBillingAddressDifferent(getIsBillingAddressDifferent());
        setEnablePayButton(selectedShippingAddress !== null && selectedBillingAddress !== null);
    }, [setIsBillingAddressDifferent, selectedBillingAddress, selectedShippingAddress]);

    useEffect(() => {
        const user = getUser();       
        const tokenResponse = validateTokens(getToken());

        if (user === null || tokenResponse === false) navigate("/");

        const deviceType = getDeviceType();
        setResponsive({
            contentWidth: deviceType === DeviceTypes.MOBILE || deviceType === DeviceTypes.MINI_MOBILE ? "100%" : "50%",
            checkoutMargin: deviceType === DeviceTypes.MOBILE || deviceType === DeviceTypes.MINI_MOBILE ? "mb-3" : "mb-4",
            dropdownWidth: deviceType === DeviceTypes.MINI_MOBILE ? "80%" : "100%",
            dropdownLabelClass: deviceType === DeviceTypes.MINI_MOBILE ? "mb-3" : "mb-0",
            dropdownRowItems: deviceType === DeviceTypes.MINI_MOBILE ? 1 : 2
        });

        setShowLoader(true);
        axios
            .get(GetAllAddressesEndpoint(), {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${tokenResponse}`
                }
            })
            .then(response => {
                setAddresses(response.data);
                setShowLoader(false);
            })
            .catch(() => navigate("/"));
    }, [getUser, getToken, navigate, getDeviceType]);

    const onHideAddressModal = () => {
        setShowAddressModal(false);
        reloadAddresses();
    };

    const reloadAddresses = () => {
        const tokenResponse = validateTokens(getToken());

        if (tokenResponse === false) navigate("/");

        setShowLoader(true);

        axios
            .get(GetAllAddressesEndpoint(), {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${tokenResponse}`
                }
            })
            .then(response => {
                setAddresses(response.data);
                setShowLoader(false);
            })
            .catch(() => navigate("/"));
    };

    const getSubTotal = () => {
        const cart = getCart();
        let sum = 0;
        cart.lineItems.forEach(lineItem => sum += lineItem.product.price * lineItem.quantity);
        return sum;
    };

    const getTotal = () => {
        let total = getSubTotal();
        total += total > 1000 ? 0 : defaultShippingPrice;
        total += total * 0.18;
        return total;
    };

    const deleteAddress = (addressId: string) => {
        const tokenResponse = validateTokens(getToken());

        if (tokenResponse === false) navigate("/");

        setShowLoader(true);

        axios.delete(`${AddressEndpoint()}/${addressId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${tokenResponse}`
            }
        })
            .then(() => {
                setShowLoader(false);
                reloadAddresses();
            })
            .catch(() => navigate("/"))
    };

    const getAddressDropdownSelectedOption = (mode: "shipping" | "billing"):
        "Select Address" | JSX.Element => {

        if ((mode === "shipping" && selectedShippingAddress === null) ||
            (mode === "billing" && selectedBillingAddress === null)) {
            return "Select Address"
        }

        const address = mode === "shipping" ? selectedShippingAddress! : selectedBillingAddress!;

        return <Stack direction="vertical" className="p-0" style={{ lineHeight: "1em", fontSize: "0.85em" }}>
            <span className="regular-font mb-2">{address.recipient}</span>
            <span className="light-font">{address.line1}...</span>
        </Stack>;
    };

    const onAddressDropdownOptionSelected = (mode: "shipping" | "billing", address: Address) => {
        if (mode === "shipping") {
            setSelectedShippingAddress(address);

            if (!isBillingAddressDifferent) setSelectedBillingAddress(address);
        }

        else setSelectedBillingAddress(address);
    }

    const addressDropdown = (mode: "shipping" | "billing") => <Dropdown style={{ width: responsive.dropdownWidth }}>
        <Dropdown.Toggle
            variant="white"
            className="light-pink"
            style={{ border: "1px solid", borderRadius: 0, width: "100%" }}>
            {getAddressDropdownSelectedOption(mode)}  &nbsp;
        </Dropdown.Toggle>

        <Dropdown.Menu
            className="light-pink"
            style={{
                borderRadius: 0,
                border: "1px solid rgba(158, 45, 79, 0.56)",
                width: "100%"
            }}>
            <Dropdown.Item
                className="light-pink d-flex justify-content-start align-items-center p-1"
                as="div"
                onClick={() => {
                    setAddressToUpdate(undefined);
                    setShowAddressModal(true);
                }}>
                <img src={addImg} height="25vh" />
                <span className="ms-1">Add address</span>
            </Dropdown.Item>
            {mode === "billing"
                ? <>
                    <hr />
                    <Dropdown.Item
                        className="light-pink d-flex justify-content-start align-items-center p-1"
                        as="div"
                        onClick={() => setSelectedBillingAddress(selectedShippingAddress)}>
                        Same as shipping
                    </Dropdown.Item>
                </>
                : null}
            {addresses
                .filter(address => mode === "shipping" || selectedShippingAddress === null
                    ? true
                    : address.id !== selectedShippingAddress.id)
                .map(address => <div className="p-0 m-0" key={address.id}>
                <hr/>
                <Dropdown.Item
                    className="light-pink text-wrap p-1"
                    as="div"
                    onClick={() => onAddressDropdownOptionSelected(mode, address)}>
                    <Stack direction="horizontal" className="p-0">
                        <Stack direction="vertical" className="p-0" style={{ lineHeight: "1em", fontSize: "0.85em" }}>
                            <span className="regular-font mb-2">{address.recipient}</span>
                            <span className="light-font">{address.line1}</span>
                            <span className="light-font">{address.line2}</span>
                            <span className="light-font">{address.city}, {address.state}</span>
                            <span className="light-font">{address.country}. PIN: {address.pincode}</span>
                            <span className="light-font">Ph: {address.phone}</span>
                        </Stack>
                        <Stack direction="vertical" className="p-0 ms-1 me-0 d-flex justify-content-center">
                            <Button variant="white" className="p-0" onClick={() => {
                                setAddressToUpdate(address.id);
                                setShowAddressModal(true);
                            }}>
                                <Image roundedCircle src={editImg} height="23" />
                            </Button>
                            <Button variant="white" className="p-0" onClick={() => deleteAddress(address.id)}>
                                <img src={deleteImg} height="20" />
                            </Button>
                        </Stack>
                    </Stack>
                </Dropdown.Item>
            </div>)}
        </Dropdown.Menu>
    </Dropdown>;

    return <>
        {showLoader
            ? <Loader />
            : <Container>
                <Stack
                    className="d-flex justify-content-center align-items-center p-4 px-2"
                    direction="vertical"
                    gap={3}>
                    <div className={responsive.checkoutMargin}>
                        <h1 className="bold-font">Checkout</h1>
                    </div>
                    <Row
                        xs={responsive.dropdownRowItems}
                        className="d-flex justify-content-between align-items-center mb-4"
                        style={{ width: responsive.contentWidth }}>
                        <Col className="p-0">
                            <h6 className={responsive.dropdownLabelClass}>
                                Shipping Address
                            </h6>
                        </Col>
                        <Col className="p-0">
                            {addressDropdown("shipping")}
                        </Col>
                    </Row>
                    <Row
                        xs={responsive.dropdownRowItems}
                        className="d-flex justify-content-between align-items-center mb-4"
                        style={{ width: responsive.contentWidth }}>
                        <Col className="p-0">
                            <h6 className={responsive.dropdownLabelClass}>
                                Billing Address
                            </h6>
                        </Col>
                        <Col className="p-0">
                            {isBillingAddressDifferent
                                ? addressDropdown("billing")
                                : <Button
                                    style={{ width: responsive.dropdownWidth }}
                                    onClick={() => setSelectedBillingAddress(null)}
                                    className="admin-button">
                                    Not same as shipping?
                                </Button>}
                        </Col>
                    </Row>
                    <div style={{ width: responsive.contentWidth }} className="mb-4 mt-3">
                        <h6 className="mb-4">Order Summary</h6>
                        {getCart().lineItems.map(lineItem => <div className="m-0 p-0" key={lineItem.id}>
                            <Stack direction="horizontal" className="mb-3">
                                <img height="80" src={lineItem.product.images[0]} />
                                <Stack direction="vertical" className="ms-3">
                                    <h6>{lineItem.product.title}</h6>
                                    <QuantityButtons productId={lineItem.product.id} quantity={lineItem.quantity} key={lineItem.id} />
                                    {getDeviceType() === DeviceTypes.MINI_MOBILE
                                        ? <Container className="px-0 mx-0 mt-2">
                                            <h6>{FormatProductPrice(lineItem.product.price * lineItem.quantity)}</h6>
                                        </Container>
                                        : null}
                                </Stack>
                                {getDeviceType() !== DeviceTypes.MINI_MOBILE
                                    ? <h6>{FormatProductPrice(lineItem.product.price * lineItem.quantity)}</h6>
                                    : null}
                            </Stack>
                            <hr />
                        </div>)}
                    </div>
                    <div style={{ width: responsive.contentWidth }} className="d-flex justify-content-between align-items-stretch mb-4">
                        <input
                            className="discount-input"
                            type="text"
                            placeholder="Discount code" />
                        <Button className="admin-button ms-3">Apply</Button>
                    </div>
                    <div style={{ width: responsive.contentWidth }}>
                        <div className="d-flex justify-content-between align-items-center px-0 py-2">
                            <h6>Subtotal</h6>
                            <h6>{FormatProductPrice(getSubTotal())}</h6>
                        </div>
                        <div className="d-flex justify-content-between align-items-center px-0 py-2">
                            <h6>Shipping</h6>
                            <span>
                                {getSubTotal() > 1000
                                    ? <h6>
                                        <s className="me-2">
                                            {FormatProductPrice(defaultShippingPrice)}
                                        </s>
                                        {FormatProductPrice(0)}
                                    </h6>
                                    : <h6>{FormatProductPrice(defaultShippingPrice)}</h6>}
                            </span>
                        </div>
                        <div className="d-flex justify-content-between align-items-center px-0 py-2">
                            <h6>
                                Total &nbsp;
                                <OverlayTrigger
                                    trigger="click"
                                    placement="top"
                                    rootClose={true}
                                    rootCloseEvent="click"
                                    overlay={<Tooltip>Including {FormatProductPrice(getTotal() * 0.18)} in taxes.</Tooltip >}>
                                    <sup><img src={infoImg} height="15"></img></sup>
                                </OverlayTrigger>
                            </h6>
                            <h6>{FormatProductPrice(getTotal())}</h6>
                        </div>
                    </div>
                    <div className="mb-3 mt-3  d-flex justify-content-between" style={{ width: responsive.contentWidth }}>
                        <Button
                            size="lg"
                            className="admin-button"
                            onClick={() => navigate('/')}
                            style={{ width: "45%" }}>
                            Back to Home
                        </Button>
                        <Button
                            size="lg"
                            className="admin-button"
                            disabled={!enablePayButton}
                            style={{ width: "45%" }}>
                            Pay Now
                        </Button>
                    </div>
                </Stack>
            </Container>}

        <AddressModal show={showAddressModal} onHide={onHideAddressModal} addressId={addressToUpdate} />
    </>;
}

