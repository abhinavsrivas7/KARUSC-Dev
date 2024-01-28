import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { ConvertToBase64 } from "../../../utilities/FileUtils";

type UploadFile = {
    fileContent: unknown | null,
    fileName: string
};

export const AddProduct = () => {
    console.log("component reloaded");
    const maxImagesCount = 5;

    const [images, setImages] = useState<UploadFile[]>(
        [{ fileContent: null, fileName: "" }]
    );

    const shouldLoadAddButton = (): boolean => {
        const newImages = images.filter(i => i.fileContent != null && i.fileName != "");
        return newImages.length >= 0 && newImages.length < maxImagesCount;
    }

    const addImageControl = () => {
        const newImages = images.filter(i => i.fileContent != null && i.fileName != "");
        newImages.push({ fileContent: null, fileName: "" });
        console.log(newImages);
        setImages([...newImages]);
    };

    const addImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files?.length > 0) {
            const newImages = images
                .filter(image => image.fileContent != null && image.fileName != "");

            newImages.push({
                fileContent: await ConvertToBase64(event.target.files[0]),
                fileName: event.target.files[0].name
            });

            setImages([...newImages]);
        }       
    }

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
        <Form.Group className="mb-4" controlId="formTitle">
            <Form.Label>Upload Product Images</Form.Label>
            {images.map(image => <Form.Control
                className="pink-placeholder"
                type="file"
                placeholder={image.fileName}
                onChange={addImage} />)}
            {shouldLoadAddButton()
                ? <Button
                    variant="primary"
                    size="sm"
                    className="admin-button mt-2"
                    onClick={addImageControl}>
                    Add
                  </Button>
                : null}
            
        </Form.Group>
        <Form.Group className="mb-4" controlId="formBasicCheckbox">
            <Form.Label>Select Product Categories</Form.Label>
            <Form.Check type="checkbox" label="Earrings" />
        </Form.Group>
        <Form.Group className="mb-4" controlId="formBasicCheckbox">
            <Form.Label>Select Product Collections</Form.Label>
            <Form.Check type="checkbox" label="Winter Special" />
        </Form.Group>
        <Button
            variant="primary"
            className="admin-button mt-4"
            style={{ width: '100%' }}>
            Create Product
        </Button>
    </Form>;
}

