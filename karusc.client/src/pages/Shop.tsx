import axios from "axios";
import { useEffect, useState } from "react";
import { Product } from "../models/Product";
import { Loader } from "../components/Common/Loader";
import { NoData } from "../components/Common/NoData";
import { Button, Col, Container, Row } from "react-bootstrap";
import { ProductCard } from "../components/Products/ProductCard";
import filterImg from "../../resources/media/filter.svg";
import { GetProductsEndpoint } from "../utilities/EndpointUtils";


export const Shop = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [errorState, setErrorState] = useState<boolean>(false);
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
        ? <>
            <Container className="d-flex justify-content-center align-items-center">
                <h1 className="bold-font light-pink">KARUSC</h1>
            </Container>
            <hr style={{color: "white"}}/>
            <Row md={3} xs={2} lg={4} className="g-3">
                {products.map(product => <Col key={product.id}><ProductCard {...product}/></Col>)}
            </Row>
            <Button 
                style={{position: "fixed", right: "2rem", bottom: "2rem", height: "3rem", width: "3rem"}}
                variant="dark">
                <img src = {filterImg} />
            </Button>
          </>
        : errorState
        ? <NoData />
        : <Loader />;
}