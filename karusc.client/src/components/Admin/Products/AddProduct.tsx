import React, { useEffect, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { ConvertToBase64 } from "../../../utilities/FileUtils";
import { Category } from "../../../models/CategoryModels";
import axios from "axios";
import { GetCategoriesEndpoint, GetCollectionsEndpoint, GetProductsEndpoint } from "../../../utilities/EndpointUtils";
import { Collection } from "../../../models/CollectionModels";
import { DissmissableAlert } from "../../Common/DissmissableAlert";
import { CreateProductCommand } from "../../../models/ProductModels";
import { Loader } from "../../Common/Loader";
import { ErrorAlert, UploadFile } from "../../../models/AdminModels";

export const AddProduct = () => {

    const maxImagesCount = 5;

    const emptyCommand: CreateProductCommand = {
        title: "", price: 0, description: "", categories: [], collections: [], images: []
    };

    const [disableControls, setDisableControls] = useState<boolean>(false);
    const [formOpacity, setFormOpacity] = useState<number>(1);

    const [errorState, setErrorState] = useState<ErrorAlert>({
        showErrorAlert: false,
        errorAlertDescription: null
    });

    const [showSuccessAlert, setShowSuccessAlert] = useState<boolean>(false);
    const [showLoader, setShowLoader] = useState<boolean>(false);
    const [images, setImages] = useState<UploadFile[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [collections, setCollections] = useState<Collection[]>([]);
    const [createCommand, setCreateCommand] = useState<CreateProductCommand>(emptyCommand);

    const formRef = useRef<HTMLFormElement>(null);

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

    const addImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files?.length > 0) {
            const newImages = images;
            const fileBase64 = await ConvertToBase64(event.target.files[0]) as string;

            newImages.push({
                fileContent: fileBase64,
                fileName: event.target.files[0].name
            });

            setImages([...newImages]);
            const updatedCommand = createCommand;
            updatedCommand.images.push(fileBase64);
            setCreateCommand(updatedCommand);
            formRef.current?.reset();
        }
    };

    const addTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
        const updatedCommand = createCommand;
        updatedCommand.title = event.target.value;
        setCreateCommand(updatedCommand);
    };

    const addPrice = (event: React.ChangeEvent<HTMLInputElement>) => {
        const updatedCommand = createCommand;
        updatedCommand.price = Number(event.target.value);
        setCreateCommand(updatedCommand);
    };

    const addDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
        const updatedCommand = createCommand;
        updatedCommand.description = event.target.value;
        setCreateCommand(updatedCommand);
    };

    const addCategory = (categoryId: string) => {
        const updatedCommand = createCommand;
        updatedCommand.categories.push(categoryId);
        updatedCommand.categories = [...new Set(updatedCommand.categories)];
        setCreateCommand(updatedCommand);
    };

    const addCollection = (collectionId: string) => {
        const updatedCommand = createCommand;
        updatedCommand.collections.push(collectionId);
        updatedCommand.collections = [...new Set(updatedCommand.collections)];
        setCreateCommand(updatedCommand);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setDisableControls(true);
        setErrorState({
            showErrorAlert: false,
            errorAlertDescription: null
        });
        setShowSuccessAlert(false);
        setFormOpacity(0.1);
        setShowLoader(true);
        axios.post(GetProductsEndpoint(), createCommand)
            .then(response => {
                if (response.status == 201) {
                    setDisableControls(false);
                    setShowSuccessAlert(true);
                    setShowLoader(false);
                    setFormOpacity(1);
                    formRef.current?.reset();
                    setCreateCommand(emptyCommand);
                    setImages([]);
                }
            })
            .catch((response) => {
                console.log(response);
                console.log(response.response.data.Message);
                setFormOpacity(1);
                setShowLoader(false);
                setErrorState({
                    showErrorAlert: true,
                    errorAlertDescription: response.response.data.Message
                        && response.response.data.Message.length
                        && response.response.data.Message.length > 0
                            ? response.response.data.Message[0] 
                            : null
                });
                setDisableControls(false);
            });
    };

    return <Form ref={formRef} onSubmit={handleSubmit} style={{opacity: formOpacity}}>
        {showSuccessAlert
            ? < DissmissableAlert
                    title="Product Created Successfully!"
                    variant="success"
                    description={null} />
            : null
        }
        {errorState.showErrorAlert
            ? < DissmissableAlert
                title="Product Could Not Be Created!"
                variant="danger"
                description={errorState.errorAlertDescription} />
            : null
        }
        <Form.Group className="mb-4" controlId="formTitle">
            <Form.Control
                className="pink-placeholder"
                type="text"
                placeholder="Enter Title"
                onChange={addTitle}
                disabled={disableControls}
                defaultValue={createCommand.title} />
        </Form.Group>
        <Form.Group className="mb-4" controlId="formPrice">
            <Form.Control
                className="pink-placeholder"
                type="number"
                placeholder="Enter Price"
                onChange={addPrice}
                disabled={disableControls}
                defaultValue={createCommand.price} />
        </Form.Group>
        <Form.Group className="mb-4" controlId="formDescription">
            <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter Description"
                className="pink-placeholder"
                onChange={addDescription}
                disabled={disableControls}
                defaultValue={createCommand.description} />
        </Form.Group>     
        <Form.Group className="mb-4" controlId="formImage">
            <Form.Label className="semi-bold-font">Upload Product Images</Form.Label>
            {images.length > 0
                ? images.map(image => <p key={crypto.randomUUID()}>{image.fileName}</p>)
                : null}
            {images.length < maxImagesCount
            ? <Form.Control
                    className="pink-placeholder"
                    type="file"
                    onChange={addImage}
                    disabled={disableControls} />
                : null}         
        </Form.Group>
        <Form.Group className="mb-4" controlId="formCategoryCheckbox">
            <Form.Label className="semi-bold-font">Select Product Categories</Form.Label>
            {categories.length > 0
                ? categories.map(category => <Form.Check
                    key={category.id}
                    type="checkbox"
                    label={category.name}
                    defaultChecked={createCommand.categories.includes(category.id)}
                    onChange={() => addCategory(category.id)}
                    disabled={disableControls} />)
                : <DissmissableAlert
                    title="No Categories Exist Yet!!"
                    variant="danger"
                    description=
                    "Please create a new category from the categories tab and try again" />}           
        </Form.Group>
        <Form.Group className="mb-4" controlId="formCollectionCheckbox">
            <Form.Label className="semi-bold-font">Select Product Collections</Form.Label>
            {collections.length > 0
                ? collections.map(collection => <Form.Check
                    key={collection.id}
                    type="checkbox"
                    label={collection.name}
                    defaultChecked={createCommand.collections.includes(collection.id)}
                    onChange={() => addCollection(collection.id)}
                    disabled={disableControls} />)
                : <DissmissableAlert
                    title="No Collections Exist Yet!!"
                    variant="danger"
                    description=
                    "Please create a new collection from the collections tab and try again" />}
        </Form.Group>
        {showLoader ? <Loader /> : null}
        <Button
            variant="primary"
            className="admin-button mt-4"
            style={{ width: '100%' }}
            type="submit"
            disabled={disableControls} >
            Create Product
        </Button>
    </Form>;
}

