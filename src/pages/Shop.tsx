import axios from "axios";
import { useEffect, useState } from "react";
import { Product } from "../models/Product";
import { Loader } from "../components/Loader";
import { NoData } from "../components/NoData";
import { Button, Col, Container, Row } from "react-bootstrap";
import { ProductCard } from "../components/ProductCard";
import filterImg from "../../resources/media/filter.svg";

export const Shop = () => {
    const [products, setProducts] = useState<Product[] | null>(null);
    const [errorState, setErrorState] = useState<boolean>(false);
    
    useEffect(() => {
        axios.get("https://fakestoreapi.com/products")
            .then(response => setProducts(response.data))
            .catch(() => setErrorState(true))    
    }, []);
    
    return products 
        ? <>
            <Container className="d-flex justify-content-center align-items-center">
                <h1>Products</h1>
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