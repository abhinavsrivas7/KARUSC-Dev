import { Accordion } from "react-bootstrap";
import { AddCategory } from "./AddCategory";
import { UpdateCategory } from "./UpdateCategory";
import { DeleteCategory } from "./DeleteCategory";

export const CategoryOperations = () => {
    return <Accordion className="light-pink mt-5">
        <Accordion.Item eventKey="0">
            <Accordion.Header>Create New Category</Accordion.Header>
            <Accordion.Body className="light-pink">
                <AddCategory />
            </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
            <Accordion.Header>Update Existing Category</Accordion.Header>
            <Accordion.Body className="light-pink">
                <UpdateCategory />
            </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
            <Accordion.Header>Delete Category</Accordion.Header>
            <Accordion.Body className="light-pink">
                <DeleteCategory />
            </Accordion.Body>
        </Accordion.Item>
    </Accordion>;
}

