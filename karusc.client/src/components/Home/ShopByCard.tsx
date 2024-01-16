import { Card } from "react-bootstrap";

export interface ShopByCardData {
    imageURL: string,
    title: string
}

export const ShopByCard = ({ imageURL, title }: ShopByCardData) => {
    return <>
        <Card style={{ border: "none" }}>
            <Card.Img variant="top" style={{ borderRadius: 0 }} src={imageURL} />
            <Card.Body className="light-pink">
                <Card.Text className="d-flex justify-content-center align-items-center regular-font">
                    {title}
                </Card.Text>
            </Card.Body>
        </Card>
    </>;
}

