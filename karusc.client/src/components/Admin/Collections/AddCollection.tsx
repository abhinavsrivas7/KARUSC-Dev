import { Button, Form } from "react-bootstrap";
import { CreateCollectionCommand } from "../../../models/CreateCollectionCommand";
import { ErrorAlert, UploadFile } from "../../../models/AdminModels";
import { GetCollectionsEndpoint } from "../../../utilities/EndpointUtils";
import axios from "axios";
import { DissmissableAlert } from "../../Common/DissmissableAlert";
import { ConvertToBase64 } from "../../../utilities/FileUtils";
import { useRef, useState } from "react";
import { Loader } from "../../Common/Loader";

export const AddCollection = () => {
    const emptyUploadFile: UploadFile = { fileContent: "", fileName: "" };
    const emptyCommand: CreateCollectionCommand = { name: "", image: "" };
    const formRef = useRef<HTMLFormElement>(null);
    const [disableControls, setDisableControls] = useState<boolean>(false);
    const [formOpacity, setFormOpacity] = useState<number>(1);
    const [showSuccessAlert, setShowSuccessAlert] = useState<boolean>(false);
    const [showLoader, setShowLoader] = useState<boolean>(false);
    const [image, setImage] = useState<UploadFile>(emptyUploadFile);
    const [createCommand, setCreateCommand] = useState<CreateCollectionCommand>(emptyCommand);
    const [errorState, setErrorState] = useState<ErrorAlert>({
        showErrorAlert: false,
        errorAlertDescription: null
    });


    const addTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
        const updatedCommand = createCommand;
        updatedCommand.name = event.target.value;
        setCreateCommand(updatedCommand);
    };

    const addImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files?.length > 0) {
            const fileBase64 = await ConvertToBase64(event.target.files[0]) as string;
            setImage({ fileContent: fileBase64, fileName: event.target.files[0].name });
            const updatedCommand = createCommand;
            updatedCommand.image = fileBase64;
            setCreateCommand(updatedCommand);
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



    return <Form ref={formRef} onSubmit={handleSubmit} style={{ opacity: formOpacity }}>
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
        <Form.Group className="mb-4" controlId="formTitle">
            <Form.Label className="semi-bold-font">Upload Collection Image</Form.Label>
            {image != emptyUploadFile
                ? <p>{image.fileName}</p>
                : null}
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
}

