import {Card } from "react-bootstrap";
import { Product } from "../../models/ProductModels";
import { FormatProductPrice, FormatProductTitle } from "../../utilities/ProductCardUtils";

export const ProductCard = (product: Product) => { 
    return <>
        <Card style={{ border: "none" }} className="mb-4">
        <Card.Img variant="top" src={product.images[0]} style={{ borderRadius: 0 }} />
            <Card.Body className="light-pink ps-1">
                <Card.Text className="mb-0 d-flex justify-content-begin align-items-center semi-bold-font">
                        {FormatProductTitle(product.title)}
                </Card.Text>
                <Card.Text className="d-flex justify-content-begin align-items-center regular-font">
                        {FormatProductPrice(product.price)}
                </Card.Text>
            </Card.Body>
    </Card>
</>
}