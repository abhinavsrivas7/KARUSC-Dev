import axios from "axios";
import { useEffect, useState } from "react";
import { Product } from "../models/Product";
import { Loader } from "../components/Loader";
import { NoData } from "../components/NoData";
import { Button, Col, Container, Row } from "react-bootstrap";
import { ProductCard } from "../components/ProductCard";

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
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white">
                    <path d="M22.906 2.841c1.104-2.412-7.833-2.841-10.907-2.841-2.934 0-12.01.429-10.906 2.841.508 1.11 8.907 12.916 8.907 12.916v5.246l4 2.997v-8.243s8.398-11.806 8.906-12.916zm-10.901-.902c4.243 0 8.144.575 8.144 1.226s-3.9 1.18-8.144 1.18-8.042-.528-8.042-1.18 3.799-1.226 8.042-1.226z"/>
                </svg>
                {/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white">
                    <path d="M19.479 2l-7.479 12.543v5.924l-1-.6v-5.324l-7.479-12.543h15.958zm3.521-2h-23l9 15.094v5.906l5 3v-8.906l9-15.094z"/>
                </svg> */}
            </Button>
          </>
        : errorState
        ? <NoData />
        : <Loader />;
}