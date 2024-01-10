import { Card } from "react-bootstrap";

export interface ShopByCardData {
    imageURL: string,
    title: string
}

export const ShopByCard = ({ imageURL, title }: ShopByCardData) => {
    return <>
        <Card style={{border: "none"}}>
            <Card.Img variant="top" src={imageURL} />
            <Card.Body>
                <Card.Text className="d-flex justify-content-center align-items-center">{title}</Card.Text>
            </Card.Body>
        </Card>
    </>;
}

