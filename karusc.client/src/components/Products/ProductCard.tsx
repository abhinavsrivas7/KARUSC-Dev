import {Card } from "react-bootstrap";
import { Product } from "../../models/Product";
import { FormatProductPrice, FormatProductTitle } from "../../utilities/ProductCardUtils";

export const ProductCard = (product: Product) => { 
    return <>
    <Card style={{ border: "none" }}>
        <Card.Img variant="top" src={product.images[0]} style={{ borderRadius: 0 }} />
            <Card.Body className="light-pink">
                <Card.Text className="d-flex justify-content-begin align-items-center regular-font">
                        {FormatProductTitle(product.title)}
                </Card.Text>
                <Card.Text className="d-flex justify-content-begin align-items-center regular-font">
                    {FormatProductPrice(product.price)}
                </Card.Text>
            </Card.Body>
    </Card>
</>
}