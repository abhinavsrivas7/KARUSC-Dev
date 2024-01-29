import { Button, Form } from "react-bootstrap";

export const DeleteCollection = () => {
    return (
        <Form>
            <Form.Group className="mb-4" controlId="selectCollectionToDelete">
                <Form.Label>Select Collection to Delete</Form.Label>
                <Form.Control className="pink-placeholder" type="text" as="select" onChange={(e) => e.type}>
                    <option value="">Select Collection</option>
                    <option value="1">Collection 1</option>
                    <option value="2">Collection 2</option>
                </Form.Control>
            </Form.Group>

            <Button
                variant="danger"
                type="submit"
                className="admin-button mt-4">
                Delete Collection
            </Button>
        </Form>
    );
};
