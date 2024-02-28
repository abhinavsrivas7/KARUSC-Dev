import { Button, Form, Stack } from "react-bootstrap";
import { DissmissableAlert } from "../../Common/DissmissableAlert";
import { ErrorAlert, UploadFile } from "../../../models/AdminModels";
import { useRef, useState } from "react";
import { SingupCommand } from "../../../models/UserModels";
import { ConvertToBase64 } from "../../../utilities/FileUtils";
import axios from "axios";
import { GetCreateAdminUserEndpoint } from "../../../utilities/EndpointUtils";
import { Loader } from "../../Common/Loader";

export const AddUser = () => {

    const emptyUploadFile: UploadFile = { fileContent: "", fileName: "" };
    const emptySignUpCommand: SingupCommand = { email: "", name: "", password: "", profilePicture: "" };
    const singupFormRef = useRef<HTMLFormElement>(null);
    const [disableControls, setDisableControls] = useState<boolean>(false);
    const [formOpacity, setFormOpacity] = useState<number>(1);
    const [showLoader, setShowLoader] = useState<boolean>(false);``
    const [signupCommand, setSignupCommand] = useState<SingupCommand>(emptySignUpCommand);
    const [image, setImage] = useState<UploadFile>(emptyUploadFile);
    const [showSuccessAlert, setShowSuccessAlert] = useState<boolean>(false);

    const [errorState, setErrorState] = useState<ErrorAlert>({
        showErrorAlert: false,
        errorAlertDescription: null
    });

    const handleSignup = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setDisableControls(true);
        setErrorState({
            showErrorAlert: false,
            errorAlertDescription: null
        });
        setFormOpacity(0.1);
        setShowLoader(true);
        axios.post(GetCreateAdminUserEndpoint(), signupCommand)
            .then(response => {
                if (response.status == 200) {
                    setDisableControls(false);
                    setShowLoader(false);
                    setShowSuccessAlert(true);
                    setFormOpacity(1);
                    singupFormRef.current?.reset();
                    setSignupCommand(emptySignUpCommand);
                    setImage(emptyUploadFile);
                }
            })
            .catch((response) => {
                console.log("Success");
                console.log(response);
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

    const addEmailToSignupCommand = (event: React.ChangeEvent<HTMLInputElement>) => {
        const updatedCommand = signupCommand;
        updatedCommand.email = event.target.value;
        setSignupCommand(updatedCommand);
    };

    const addNameToSignupCommand = (event: React.ChangeEvent<HTMLInputElement>) => {
        const updatedCommand = signupCommand;
        updatedCommand.name = event.target.value;
        setSignupCommand(updatedCommand);
    };


    const addPasswordToSignupCommand = (event: React.ChangeEvent<HTMLInputElement>) => {
        const updatedCommand = signupCommand;
        updatedCommand.password = event.target.value;
        setSignupCommand(updatedCommand);
    };

    const addImageToSignUpCommand = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files?.length > 0) {
            const fileBase64 = await ConvertToBase64(event.target.files[0]) as string;
            setImage({ fileContent: fileBase64, fileName: event.target.files[0].name });
            const updatedCommand = signupCommand;
            updatedCommand.profilePicture = fileBase64;
            setSignupCommand(updatedCommand);
            singupFormRef.current?.reset();
        }
    };

    return <Form
        style={{ width: '100%', opacity: formOpacity }}
        ref={singupFormRef}
        onSubmit={handleSignup}>
        {showSuccessAlert
            ? < DissmissableAlert
                title="User Created Successfully!"
                variant="success"
                description={null} />
            : null
        }
        {errorState.showErrorAlert
            ? < DissmissableAlert
                title="User Could Not Be Created!"
                variant="danger"
                description={errorState.errorAlertDescription} />
            : null
        }
        <Form.Group className="mb-4" controlId="formEmail">
            <Form.Control
                className="pink-placeholder"
                type="email"
                placeholder="Email"
                onChange={addEmailToSignupCommand} />
        </Form.Group>
        <Form.Group className="mb-4" controlId="formName">
            <Form.Control
                className="pink-placeholder"
                type="input"
                placeholder="Name"
                onChange={addNameToSignupCommand} />
        </Form.Group>
        <Form.Group className="mb-4" controlId="formPassword">
            <Form.Control
                className="pink-placeholder"
                type="password"
                placeholder="Password"
                onChange={addPasswordToSignupCommand} />
        </Form.Group>
        <Form.Group className="mb-4" controlId="formImage">
            <Form.Label className="semi-bold-font mb-1">Upload Image</Form.Label>
            {image.fileContent !== emptyUploadFile.fileContent
                ? <p>Image</p>
                : null}
            <Form.Control
                className="pink-placeholder"
                type="file"
                onChange={addImageToSignUpCommand}
                disabled={disableControls}
                defaultValue={signupCommand.profilePicture} />
        </Form.Group>
        {showLoader ? <Loader /> : null}
        <Stack
            direction="vertical"
            style={{ width: '100%' }}
            className="d-flex justify-content-center align-items-center">
            <Button
                variant="primary"
                className="admin-button my-2 light-font"
                style={{ width: '50%' }}
                type="submit">
                Create User
            </Button>
        </Stack>
    </Form>; }