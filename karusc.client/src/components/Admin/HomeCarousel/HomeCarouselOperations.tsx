import { Accordion } from "react-bootstrap";

export const HomeCarouselOperations = () => {
    return <Accordion className="light-pink mt-5">
        <Accordion.Item eventKey="0">
            <Accordion.Header>Add New Home Carousel Image</Accordion.Header>
            <Accordion.Body className="light-pink">
            </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
            <Accordion.Header>Delete Home Carousel Image</Accordion.Header>
            <Accordion.Body className="light-pink">
            </Accordion.Body>
        </Accordion.Item>
    </Accordion>;
}

