import { Col, Container, Row } from "react-bootstrap";
import { ShopByCard } from "./ShopByCard";
import { NavLink } from "react-router-dom";
import { Category } from "../../models/CategoryModels";
import { Collection } from "../../models/CollectionModels";
import { ProductListFilter } from "../../models/ProductModels";

interface ShopByComponentProps {
    componentFor: string;
    data: Category[] | Collection[];
}

export const ShopBy = ({ componentFor, data }: ShopByComponentProps) => {
    const getProductsFilter = (id: string): ProductListFilter => {
        return { id: id, name: componentFor };
    } 

    return (
        <Container className="mt-4">
            <Container className="d-flex justify-content-center align-items-center mb-4 semi-bold-font">
                <h2>Shop By {componentFor}</h2>
            </Container>
            <Row md={4} xs={3} lg={4} className="g-2">
                {data.map((item) => (
                    <Col key={item.id} className="d-flex justify-content-center align-items-center">
                        <NavLink
                            style={{ textDecoration: 'none' }}
                            to="/ProductList"
                            state={getProductsFilter(item.id)}>
                            <ShopByCard
                                imageURL={item.imageURL}
                                name={item.name}
                                id={item.id} />
                        </NavLink>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};
