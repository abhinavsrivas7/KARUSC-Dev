import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Product } from "../models/Product";
import { GetProductsEndpoint } from "../utilities/EndpointUtils";
import axios from "axios";
import { Loader } from "../components/Common/Loader";
import { ProductCarousel } from "../components/Products/ProductCarousel";
import { Col, Container, Row } from "react-bootstrap";
import { useScreenSize } from "../context/ScreenSizeContext";
import { DeviceTypes } from "../models/DeviceTypes";

export const ProductDetails = () => {
    const navigate = useNavigate();
    const [product, setProduct] = useState<Product | null>(null);
    const { getDeviceType } = useScreenSize();
    const marginClass = getDeviceType() == DeviceTypes.MOBILE ? "mt-4" : "";
   

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
                <Row md={2} xs={1} lg={2}>
                    <Col>
                        <ProductCarousel images={product.images} />
                    </Col>
                    <Col className={marginClass}>
                        <Row className="mb-3">
                            <Col>
                                <h2>{product.title}</h2>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <p>Price: {product.price}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <p>Description: {product.description}</p>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </>
        : <Loader />;
}
