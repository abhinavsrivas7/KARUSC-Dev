import { Button, Form } from "react-bootstrap";

export const DeleteCategory = () => {
    return (
            <Form>
                <Form.Group className="mb-4" controlId="selectCollectionToDelete">
                    <Form.Label>Select Category to Delete</Form.Label>
                    <Form.Control className="pink-placeholder" type="text" as="select" onChange={(e) => e.type}>
                        <option value="">Select Collection</option>
                        <option value="1">Category 1</option>
                        <option value="2">Category 2</option>
                    </Form.Control>
                </Form.Group>

            <Button
                variant="danger"
                type="submit"
                className="admin-button mt-4">
                Delete Category
            </Button>
        </Form>
    );
};
