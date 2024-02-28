import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Product } from "../models/ProductModels";
import { GetProductsEndpoint } from "../utilities/EndpointUtils";
import axios from "axios";
import { Loader } from "../components/Common/Loader";
import { ImageCarousel } from "../components/Common/ImageCarousel";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useScreenSize } from "../context/ScreenSizeContext";
import { DeviceTypes } from "../models/DeviceTypes";
import shareImg from "../../resources/media/share.svg"

export const ProductDetails = () => {
    const navigate = useNavigate();
    const [product, setProduct] = useState<Product | null>(null);
    const { getDeviceType } = useScreenSize();
    const marginClass = getDeviceType() === DeviceTypes.MOBILE ? "mt-4 px-5" : "px-5";


    const handleSharing = (title: string, text: string) => navigator
        .share({
            text: text,
            title: title,
            url: window.location.href
        })
        .then(() => console.log("Hooray! Your content was shared to tha world"));
   

    useEffect(() => {
        try {
            const id = window.location.href.split('/')?.slice(-1)[0]?.split('?')[1].split('=')[1];

            axios.get(`${GetProductsEndpoint()}/${id}`)
                .then(response => {
                    setProduct(response.data);
                })
                .catch(() => navigate("/"));
        }
        catch { navigate("/"); }
    }, []);

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
                                <span className="extra-bold-font">Price: </span>
                                <span>{product.price}</span>
                                <p className="light-font" style={{ fontSize: "small" }}>Tax Included</p>
                            </Col>
                        </Row>
                        <Row>
                            <Button
                                variant="primary"
                                className="admin-button mt-1"
                                type="submit"
                                style={{ width: "50%" }}>
                                Add To Cart
                            </Button>
                        </Row>
                        <Row>
                            <Button
                                variant="primary"
                                className="admin-button mt-4 mb-4"
                                type="submit"
                                style={{ width: "50%" }}>
                                Buy Now
                            </Button>
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
