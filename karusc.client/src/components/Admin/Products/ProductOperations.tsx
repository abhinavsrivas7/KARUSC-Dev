import { Accordion } from "react-bootstrap";
import { AddProduct } from "./AddProduct";
import { UpdateProduct } from "./UpdateProduct";
import { DeleteProduct } from "./DeleteProduct";

export const ProductOperations = () => {
    return <Accordion className="light-pink mt-5">
        <Accordion.Item eventKey="0">
            <Accordion.Header>Create New Product</Accordion.Header>
            <Accordion.Body className="light-pink">
                <AddProduct />
            </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
            <Accordion.Header>Update Existing Product</Accordion.Header>
            <Accordion.Body className="light-pink">
                <UpdateProduct />
            </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
            <Accordion.Header>Delete Product</Accordion.Header>
            <Accordion.Body>
                <DeleteProduct />
            </Accordion.Body>
        </Accordion.Item>
    </Accordion>;
}

