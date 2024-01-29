import { Button, Form } from "react-bootstrap";

export const UpdateCollection = () => {
    return (
        <div>
            <Form>
                <Form.Group className="mb-4" controlId="selectCollections">
                    <Form.Label>Select Collection to Update</Form.Label>
                    <Form.Control className="pink-placeholder" type="text" as="select" onChange={(e) => e.type}>
                        <option value="">Select Collection</option>
                        <option value="1">Collection 1</option>
                        <option value="2">Collection 2</option>
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
};
