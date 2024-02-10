import { Accordion } from "react-bootstrap";
import { AddCollection } from "./AddCollection";
import { UpdateCollection } from "./UpdateCollection";
import { DeleteCollection } from "./DeleteCollection";

export const CollectionOperations = () => {
    return <Accordion className="light-pink mt-5">
        <Accordion.Item eventKey="0">
            <Accordion.Header>Create New Collection</Accordion.Header>
            <Accordion.Body className="light-pink">
                <AddCollection />
            </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
            <Accordion.Header>Update Existing Collection</Accordion.Header>
            <Accordion.Body className="light-pink">
                <UpdateCollection />
            </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
            <Accordion.Header>Delete Collection</Accordion.Header>
            <Accordion.Body className="light-pink">
                <DeleteCollection />
            </Accordion.Body>
        </Accordion.Item>
    </Accordion>;
}

