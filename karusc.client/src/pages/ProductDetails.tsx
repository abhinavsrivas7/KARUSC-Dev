import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Product } from "../models/Product";
import { GetProductsEndpoint } from "../utilities/EndpointUtils";
import axios from "axios";
import { Loader } from "../components/Common/Loader";
import { ProductCarousel } from "../components/Products/ProductCarousel";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useScreenSize } from "../context/ScreenSizeContext";
import { DeviceTypes } from "../models/DeviceTypes";
import shareImg from "../../resources/media/share.svg"

export const ProductDetails = () => {
    const navigate = useNavigate();
    const [product, setProduct] = useState<Product | null>(null);
    const { getDeviceType } = useScreenSize();
    const marginClass = getDeviceType() === DeviceTypes.MOBILE ? "mt-4 px-5" : "px-5";
   

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
                            <ProductCarousel images={product.images} />
                            </Row>
                        <Row className="d-flex align-items-center justify-content-center">
                            <Button
                                variant="primary"
                                className="admin-button mt-4"
                                type="submit"
                                style={{ width: "100%" }}>
                                Add To Cart
                            </Button>
                        </Row>
                        <Row className="d-flex align-items-center justify-content-center">
                            <Button
                                variant="primary"
                                className="admin-button mt-4 mb-4"
                                type="submit"
                                style={{ width: "100%" }}>
                                Buy Now
                            </Button>
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
                            <Col>
                                <span className="extra-bold-font">Description</span>
                                <p>{product.description}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <span className="extra-bold-font">Core Instructions</span>
                                <p>Product description like  this is made of this material  etc.</p>
                            </Col>
                        </Row>
                        <Row>
                            <Button variant="white" style={{ display: 'flex', alignItems: 'center', border: 0, paddingLeft:""}}>
                                <img src={shareImg} style={{ width: '1.45rem', height: 'auto'}} />
                                <span className="ms-2 light-pink regular-font">Share</span>
                            </Button>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </>
        : <Loader />;
}
