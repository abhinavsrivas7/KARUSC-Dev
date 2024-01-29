import { Button, Form } from "react-bootstrap";

export const UpdateCategory = () => {
    return (
        <div>
            <Form>
                <Form.Group className="mb-4" controlId="selectCategory">
                    <Form.Label>Select Category to Update</Form.Label>
                    <Form.Control className="pink-placeholder" type="text" as="select" onChange={(e) => e.type}>
                        <option value="">Select Category</option>
                        <option value="1">Category 1</option>
                        <option value="2">Category 2</option>
                    </Form.Control>
                </Form.Group>
            </Form>
            <Form>
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
