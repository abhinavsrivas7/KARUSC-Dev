import { Button, Form } from "react-bootstrap";

export const AddCollection = () => {
    return <Form>
        <Form.Group className="mb-4" controlId="formTitle">
            <Form.Control className="pink-placeholder" type="text" placeholder="Enter Title" />
        </Form.Group>
        <Form.Group className="mb-4" controlId="formDescription">
            <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter Description"
                className="pink-placeholder"/>
        </Form.Group>
        <Form.Group className="mb-4" controlId="formTitle">
            <Form.Label>Upload Collection Image</Form.Label>
            <Form.Control className="pink-placeholder" type="file" placeholder="Enter Title" />
        </Form.Group>
        <Button
            variant="primary"
            type="submit"
            className="admin-button mt-4"
            style={{ width: '100%' }}
            size="lg">
            Submit
        </Button>
    </Form>;
}

