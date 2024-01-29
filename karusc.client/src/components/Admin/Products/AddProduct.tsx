import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { ConvertToBase64 } from "../../../utilities/FileUtils";
import { Category } from "../../../models/Category";
import axios from "axios";
import { GetCategoriesEndpoint, GetCollectionsEndpoint } from "../../../utilities/EndpointUtils";
import { Collection } from "../../../models/Collection";
import { DissmissableAlert } from "../../Common/DissmissableAlert";
import { CreateProductCommand } from "../../../models/CreateProductCommand";

type UploadFile = {
    fileContent: unknown | null,
    fileName: string
};

export const AddProduct = () => {
    const maxImagesCount = 5;
    const createCommand: CreateProductCommand = {
        title: "",
        price: 0,
        description: "",
        images: [],
        categories: [],
        collections: []
    };

    const [images, setImages] = useState<UploadFile[]>(
        [{ fileContent: null, fileName: "" }]
    );

    const [categories, setCategories] = useState<Category[]>([]);
    const [collections, setCollections] = useState<Collection[]>([]);

    useEffect(() => {
        axios.get(GetCategoriesEndpoint(), {
            params: {
                pageSize: 10,
                pageNumber: 0
            }
        })
        .then(response => {
            setCategories(response.data)
        })
    }, []);

    useEffect(() => {
        axios.get(GetCollectionsEndpoint(), {
            params: {
                pageSize: 10,
                pageNumber: 0
            }
        })
        .then(response => {
            setCollections(response.data)
        })
    }, []);

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

    const addTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
        createCommand.title = event.target.value;
        console.log(createCommand);
    } 

    return <Form>
        <Form.Group className="mb-4" controlId="formTitle">
            <Form.Control
                className="pink-placeholder"
                type="text"
                placeholder="Enter Title"
                onChange={addTitle} />
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
            {categories.length > 0
                ? categories.map(category => <Form.Check type="checkbox" label={category.name} />)
                : <DissmissableAlert
                    title="No Categories Exist Yet!!"
                    description=
                    "Please create a new category from the categories tab and try again" />}           
        </Form.Group>
        <Form.Group className="mb-4" controlId="formBasicCheckbox">
            <Form.Label>Select Product Collections</Form.Label>
            {collections.length > 0
                ? collections.map(collection => <Form.Check type="checkbox" label={collection.name} />)
                :
                <DissmissableAlert
                    title="No Collections Exist Yet!!"
                    description=
                    "Please create a new collection from the collections tab and try again" />}
        </Form.Group>
        <Button
            variant="primary"
            className="admin-button mt-4"
            style={{ width: '100%' }}>
            Create Product
        </Button>
    </Form>;
}

