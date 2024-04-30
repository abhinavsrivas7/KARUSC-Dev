import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Product } from "../models/ProductModels";
import { GetProductByIdEndpoint } from "../utilities/EndpointUtils";
import axios from "axios";
import { Loader } from "../components/Common/Loader";
import { ImageCarousel } from "../components/Common/ImageCarousel";
import { Button, Col, Container, Row } from "react-bootstrap";
import { DeviceTypes } from "../models/DeviceTypes";
import shareImg from "../../resources/media/share.svg";
import { FormatProductPrice } from "../utilities/ProductCardUtils";
import { useScreenSize } from "../hooks/useScreenSize";
import { useCartContext } from "../hooks/useCart";
import { DissmissableAlert } from "../components/Common/DissmissableAlert";
import { QuantityButtons } from "../components/Common/QuantityButtons";

export const ProductDetails = () => {
    const navigate = useNavigate();
    const [product, setProduct] = useState<Product | null>(null);
    const { getDeviceType } = useScreenSize();
    const { getCart, addToCart } = useCartContext();
    const marginClass = getDeviceType() === DeviceTypes.MOBILE || getDeviceType() === DeviceTypes.MINI_MOBILE ? "mt-4 px-5" : "px-5";
    const [showAddToCartLoader, setShowAddToCartLoader] = useState<boolean>(false);
    const [showError, setShowError] = useState<boolean>(false);
    const [errorDescription, setErrorDescription] = useState<string | null>(null);
    const getCurrentQuantity = () => {
        if (product) {
            const lineItem = getCart().lineItems.find(li => li.product.id === product.id);
            if (lineItem) {
                return lineItem.quantity
            }
        }

        return null;
    }
    const [currentQuantity, setCurrentQuantity] = useState<number | null>(getCurrentQuantity());
    const handleSharing = (title: string, text: string) => navigator
        .share({
            text: text,
            title: title,
            url: window.location.href
        });

    useEffect(() => {
        try {
            const id = window.location.href.split('/')?.slice(-1)[0]?.split('?')[1].split('=')[1];

            axios.get(`${GetProductByIdEndpoint()}/${id}`)
                .then(response => {
                    setProduct(response.data);
                })
                .catch(() => navigate("/"));
        }
        catch { navigate("/"); }
    }, [navigate]);


    useEffect(() => {
        if (product) {
            const lineItem = getCart().lineItems.find(li => li.product.id === product.id);
            if (lineItem) {
                setCurrentQuantity(lineItem.quantity);
            }
        }
    }, [product, getCart]);


    const handleAddToCart = (product: Product) => {
        setShowAddToCartLoader(true);
        addToCart(product)
            .then(response => {
                setShowAddToCartLoader(false);
                if (typeof response === "string") {
                    setErrorDescription(response);
                    setShowError(true);
                }
                else {
                    setCurrentQuantity(1);
                }

                setShowAddToCartLoader(false);
            });
    };

    return product
        ? <>
            <Container className="py-4">
                <Row md={2} xs={1} lg={2} >
                    <Col>
                        <Row className="d-flex align-items-center justify-content-center">
                            <ImageCarousel
                                images={product.images}
                                setControls={true}
                                showIndicators={true}
                                intervalValue={null}
                                isDraggable={true} />
                            </Row>
                    </Col>
                    <Col className={marginClass}>
                        <Row className="mb-3">
                            <Col>
                                <h2>{product.title}</h2>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <span>{FormatProductPrice(product.price)}</span>
                                <p className="light-font" style={{ fontSize: "small" }}>Tax Included</p>
                            </Col>
                        </Row>
                        <Row>
                            {showAddToCartLoader
                                ? <Loader />
                                : showError
                                ? <DissmissableAlert
                                    title="Error in adding product to cart."
                                    description={errorDescription}
                                    variant="danger"
                                        onClose={() => setShowError(false)} />
                                : currentQuantity !== null && getCurrentQuantity() !== null
                                ? <QuantityButtons
                                    productId={product.id}
                                    quantity={getCurrentQuantity()!} />
                                : <Container>
                                    <Button
                                        variant="primary"
                                        className="admin-button mt-1"
                                        onClick={() => handleAddToCart(product)}
                                        style={{ width: "50%" }}>
                                        Add To Cart
                                    </Button>
                                </Container>}        
                        </Row>
                        <Row>
                            <Container>
                                <Button
                                    variant="primary"
                                    className="admin-button mt-4 mb-4"
                                    type="submit"
                                    style={{ width: "50%" }}>
                                    Buy Now
                                </Button>
                            </Container>
                        </Row>
                        <Row>
                            <Col>
                                <span className="extra-bold-font">Description</span>
                                <p>{product.description}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <span className="extra-bold-font">Care Instructions</span>
                                <p>{product.careInstructions}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Button onClick={() => handleSharing(product.title, product.description)} variant="white" style={{ display: 'flex', alignItems: 'center', border: 0, paddingLeft: "" }}>
                                <img src={shareImg} style={{ width: '1.45rem', height: 'auto'}} />
                                <span className="ms-1 light-pink regular-font">Share</span>
                            </Button>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </>
        : <Loader />;
}
