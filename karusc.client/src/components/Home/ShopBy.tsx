import { Col, Container, Row } from "react-bootstrap";
import { ShopByCard } from "./ShopByCard";
import { NavLink } from "react-router-dom";
import { Category } from "../../models/Category";
import { Collection } from "../../models/Collection";

interface ShopByComponentProps {
    componentFor: string;
    data: Category[] | Collection[];
}

export const ShopBy = ({ componentFor, data }: ShopByComponentProps) => {
    return (
        <Container className="mt-4">
            <Container className="d-flex justify-content-center align-items-center mb-4 semi-bold-font">
                <h2>Shop By {componentFor}</h2>
            </Container>
            <Row md={4} xs={3} lg={4} className="g-2">
                {data.map((item) => (
                    <Col key={item.id} className="d-flex justify-content-center align-items-center">
                        <NavLink style={{ textDecoration: 'none' }} to="/shop">
                            <ShopByCard imageURL={item.image} title={item.name} />
                        </NavLink>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};
