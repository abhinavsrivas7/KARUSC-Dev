import axios from "axios";
import { useEffect, useState } from "react";
import { Product } from "../models/Product";
import { Loader } from "../components/Common/Loader";
import { NoData } from "../components/Common/NoData";
import { Button, Col, Container, Row } from "react-bootstrap";
import { ProductCard } from "../components/Products/ProductCard";
import filterImg from "../../resources/media/filter.svg";
import { GetProductsEndpoint } from "../utilities/EndpointUtils";
import { useScreenSize } from "../context/ScreenSizeContext";
import { DeviceTypes } from "../models/DeviceTypes";
import { NavLink } from "react-router-dom";



export const Shop = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [errorState, setErrorState] = useState<boolean>(false);
    const { getDeviceType } = useScreenSize();
    const gapVal = getDeviceType() == DeviceTypes.DESKTOP ? 0 : 1;
    const gapClass = getDeviceType() == DeviceTypes.DESKTOP ? "my -2 px-3" : "my-2 px-1";
    const link = "/shop?product=";

    //console.log(window.location.href
    //    .substring(window.location.href.indexOf('?') + 1)
    //    .split('&')
    //    .map(keyValuePair => keyValuePair.split('=')));

    useEffect(() => {
        axios.get(GetProductsEndpoint(), {
            params: {
                pageSize: 10,
                pageNumber: 0
            }
        })
            .then(response => {
                console.log(response);
                setProducts(response.data)
            })
            .catch(() => setErrorState(true))    
    }, []);
    
    return products 
        ?
        <>
            <Container className="d-flex justify-content-center align-items-center">
                <h1 className="bold-font light-pink">KARUSC</h1>
            </Container>
            <hr style={{color: "white"}}/>
            <Container className="mt-4">
                <Row md={4} xs={3} lg={4} gap={gapVal}>
                    {products.map((item) => (
                        <Col key={item.id} className={gapClass}>
                            <NavLink style={{ textDecoration: 'none', width: '100%' }} to={link + item.id}>
                                <ProductCard
                                    images={item.images}
                                    title={item.title}
                                    price={item.price}
                                    id={item.id}
                                    description={item.description}
                                    category={item.category}/>
                            </NavLink>
                        </Col>
                    ))}
                </Row>
            </Container>
            <Button
                style={{ position: "fixed", right: "2rem", bottom: "2rem", height: "3rem", width: "3rem" }}
                variant="dark">
                <img src={filterImg} />
            </Button>
          </>
        : errorState
        ? <NoData />
        : <Loader />;
}