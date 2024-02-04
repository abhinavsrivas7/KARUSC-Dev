import { Card } from "react-bootstrap";
import { Category } from "../../models/Category";
import { Collection } from "../../models/Collection";

export const ShopByCard = (data: Category | Collection) => {
    return <>
        <Card style={{ border: "none" }}>
            <Card.Img variant="top" style={{ borderRadius: 0 }} src={data.imageURL} />
            <Card.Body className="light-pink">
                <Card.Text className="d-flex justify-content-center align-items-center regular-font">
                    {data.name}
                </Card.Text>
            </Card.Body>
        </Card>
    </>;
}

