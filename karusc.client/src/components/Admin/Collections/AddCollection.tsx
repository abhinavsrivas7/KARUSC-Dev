import { Button, Form } from "react-bootstrap";
import { CreateCollectionCommand } from "../../../models/CollectionModels";
import { ErrorAlert, UploadFile } from "../../../models/AdminModels";
import { GetCollectionsEndpoint } from "../../../utilities/EndpointUtils";
import axios from "axios";
import { DissmissableAlert } from "../../Common/DissmissableAlert";
import { ConvertToBase64 } from "../../../utilities/FileUtils";
import { useRef, useState } from "react";
import { Loader } from "../../Common/Loader";
import { ImageCropper } from "../../Common/ImageCropper";

export const AddCollection = () => {
    const emptyUploadFile: UploadFile = { content: "", name: "", index: -1 };
    const emptyCommand: CreateCollectionCommand = { name: "", image: "" };
    const formRef = useRef<HTMLFormElement>(null);
    const [disableControls, setDisableControls] = useState<boolean>(false);
    const [formOpacity, setFormOpacity] = useState<number>(1);
    const [showSuccessAlert, setShowSuccessAlert] = useState<boolean>(false);
    const [showLoader, setShowLoader] = useState<boolean>(false);
    const [image, setImage] = useState<UploadFile>(emptyUploadFile);
    const [createCommand, setCreateCommand] = useState<CreateCollectionCommand>(emptyCommand);
    const [showImageCropper, setShowImageCropper] = useState<boolean>(false);

    const [errorState, setErrorState] = useState<ErrorAlert>({
        showErrorAlert: false,
        errorAlertDescription: null
    });

    const cropImageCallback = (returnedCroppedImage: string) => {
        setShowImageCropper(false);

        if (returnedCroppedImage !== null) {
            setImage({ content: returnedCroppedImage, name: image.name, index: 0 });
            const updatedCommand = createCommand;
            updatedCommand.image = returnedCroppedImage;
            setCreateCommand(updatedCommand);
        }
    }

    const addTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
        const updatedCommand = createCommand;
        updatedCommand.name = event.target.value;
        setCreateCommand(updatedCommand);
    };

    const addImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files?.length > 0) {
            const fileBase64 = await ConvertToBase64(event.target.files[0]) as string;
            setImage({ content: fileBase64, name: event.target.files[0].name, index: 0 });
            setShowImageCropper(true);
            formRef.current?.reset();
        }
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
        axios.post(GetCollectionsEndpoint(), createCommand)
            .then(response => {
                if (response.status == 201) {
                    setDisableControls(false);
                    setShowSuccessAlert(true);
                    setShowLoader(false);
                    setFormOpacity(1);
                    formRef.current?.reset();
                    setCreateCommand(emptyCommand);
                    setImage(emptyUploadFile);
                }
            })
            .catch((response) => {
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



    return <>
    <Form ref={formRef} onSubmit={handleSubmit} style={{ opacity: formOpacity }}>
        {showSuccessAlert
            ? < DissmissableAlert
                title="Collection Created Successfully!"
                variant="success"
                description={null} />
            : null
        }
        {errorState.showErrorAlert
            ? < DissmissableAlert
                title="Collection Could Not Be Created!"
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
                defaultValue={createCommand.name} />
        </Form.Group>
            <Form.Group className="mb-4" controlId="formImage">
                <Form.Label className="semi-bold-font mb-1">
                    {createCommand.image !== null ? "Change Picture" : "Upload Image"}
                </Form.Label>
                {createCommand.image !== null
                    ? <div className="my-2">
                        <img src={createCommand.image} height="70vh" />
                    </div>
                    : null
                }
                <Form.Control
                    className="pink-placeholder"
                    type="file"
                    onChange={addImage}
                    disabled={disableControls}
                    defaultValue={createCommand.image} />
        </Form.Group>
        {showLoader ? <Loader /> : null}
        <Button
            variant="primary"
            className="admin-button mt-4"
            style={{ width: '100%' }}
            type="submit"
            disabled={disableControls} >
            Create Collection
        </Button>
    </Form>;
    <ImageCropper
        aspectRatio={1}
        image={image.content}
        minWidth={150}
        circularCrop={false}
        callBack={cropImageCallback}
        show={showImageCropper} />
    </>;
}

