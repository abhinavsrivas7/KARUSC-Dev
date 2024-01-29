import { Button, Form } from "react-bootstrap";

export const UpdateProduct = () => {
    return (
        <div>
            <Form>
                <Form.Group className="mb-4" controlId="formProductId">
                    <Form.Control
                        className="pink-placeholder"
                        type="text"
                        placeholder="Enter Product ID to Update"
                    />
                </Form.Group>
                <Button
                    variant="primary"
                    type="submit"
                    className="admin-button mt-2">
                    Update
                </Button>
            </Form>
        </div>
    );
}
