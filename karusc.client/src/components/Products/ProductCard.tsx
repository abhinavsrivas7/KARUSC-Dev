import { Button, Card } from "react-bootstrap";
import { Product } from "../../models/Product";
import { FormatProductPrice, FormatProductTitle } from "../../utilities/ProductCardUtils";

let quantity = 0;
export const ProductCard = (product: Product) => <Card className="h-100">
    <Card.Img variant="top" src={product.images[0]} height="150px" style={{objectFit: "cover"}}/>
    <Card.Body className="d-flex flex-column">
        <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
            <span className="fs-5" title={product.title}>
                {FormatProductTitle(product.title)}
            </span>
            <span className="ms-2 text-muted">
                {FormatProductPrice(product.price)}
            </span>
        </Card.Title>
        <div className="mt-auto">
            {quantity === 0 
                ? <Button variant="dark" className="w-75 p-1">Add to cart</Button> 
                : <div className="d-flex align-items-center flex-column" style={{gap: "0.5rem"}}>
                    <div className="d-flex align-items-center justify-content-center" style={{gap: "0.5rem"}}>
                        <Button 
                            variant="dark" 
                            style={{borderRadius: "0%", width: "2.5rem"}}
                            onClick={() => quantity--}>
                            -
                        </Button>
                        <div>
                            <span className="fs-3">{quantity}</span>
                        </div>
                        <Button 
                            variant="dark"
                            style={{borderRadius: "0%", width: "2.5rem"}}
                            onClick={() => quantity++}>
                            +
                        </Button>    
                    </div>
                    <Button 
                        variant="dark"
                        size="sm"
                        style={{borderRadius: "0%"}}
                        onClick={() => quantity = 0}>
                        Remove
                    </Button>
                  </div>}
        </div>
    </Card.Body>
</Card>;