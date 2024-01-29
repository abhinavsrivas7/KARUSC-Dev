import {Card } from "react-bootstrap";
import { Product } from "../../models/Product";
import { FormatProductPrice, FormatProductTitle } from "../../utilities/ProductCardUtils";

export const ProductCard = (product: Product) => <Card className="h-100" style={{ cursor: "pointer" }}>
    <Card.Img variant="top" src={product.images[0]} height="150px" style={{objectFit: "cover"}}/>
    <Card.Body className="d-flex flex-column">
        <Card.Title className="d-flex justify-content-between align-items-baseline mb-4 bold-font">
            <div>
                <div className="light-pink" title={product.title}>
                    {FormatProductTitle(product.title)}
                </div>
                <div className="mt-2 light-pink">
                    {FormatProductPrice(product.price)}
                </div>
            </div>
        </Card.Title>
    </Card.Body>
</Card>;