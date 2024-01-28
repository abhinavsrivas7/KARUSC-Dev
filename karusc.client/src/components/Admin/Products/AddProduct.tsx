import { Button, Form } from "react-bootstrap";

export const AddProduct = () => {
    return <Form>
        <Form.Group className="mb-4" controlId="formTitle">
            <Form.Control className="pink-placeholder" type="text" placeholder="Enter Title" />
        </Form.Group>
        <Form.Group className="mb-4" controlId="formPrice">
            <Form.Control className="pink-placeholder" type="number" placeholder="Enter Price" />
        </Form.Group>
        <Form.Group className="mb-4" controlId="formDescription">
            <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter Description"
                className="pink-placeholder"/>
        </Form.Group>
        <Form.Group className="mb-4" controlId="formBasicCheckbox">
            <Form.Label>Select Product Categories</Form.Label>
            <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Form.Group className="mb-4" controlId="formTitle">
            <Form.Label>Upload Product Images</Form.Label>
            <Form.Control className="pink-placeholder" type="file" placeholder="Enter Title" />
            <Button
                variant="primary"
                type="submit"
                size="sm"
                className="admin-button mt-2">
                Add
            </Button>
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

