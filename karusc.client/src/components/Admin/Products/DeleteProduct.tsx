import { Button, Form } from "react-bootstrap";

export const DeleteProduct = () => {
    return (
        <Form>
            <Form.Group className="mb-4" controlId="formProductId">
                <Form.Control
                    className="pink-placeholder"
                    type="text"
                    placeholder="Enter Product ID to Delete"
                />
            </Form.Group>

            <Button
                variant="danger"
                type="submit"
                className="admin-button mt-4">
                Delete Product
            </Button>
        </Form>
    );
};
