import { Button, Form, Modal, Stack } from "react-bootstrap";
import { GoogleAuthComponent } from "./GoogleAuthComponent";
import { useRef, useState } from "react";
import { LoginCommand, SingupCommand, StorableUser } from "../../models/UserModels";
import { DissmissableAlert } from "../Common/DissmissableAlert";
import { ErrorAlert, UploadFile } from "../../models/AdminModels";
import { Loader } from "../Common/Loader";
import { GetLoginEndpoint, GetSignupEndpoint } from "../../utilities/EndpointUtils";
import axios from "axios";
import { ConvertToBase64 } from "../../utilities/FileUtils";
import { useUserContext } from "../../hooks/useUser";
import { ImageCropper } from "../Common/ImageCropper";
import userImg from "../../../resources/media/user.svg";

export type LoginModalData = {
    show: boolean,
    onHide: () => void,
    onLogin?: (user: StorableUser) => void
}

export const LoginModal = (modalData: LoginModalData) => {

    const emptyUploadFile: UploadFile = { content: "", name: "", index: -1 };
    const [isLoginMode, setIsLoginMode] = useState<boolean>(true);
    const emptyLoginCommand: LoginCommand = { email: "", password: "" };
    const emptySignUpCommand: SingupCommand = { email: "", name: "", password: "", profilePicture: "" };
    const loginFormRef = useRef<HTMLFormElement>(null);
    const singupFormRef = useRef<HTMLFormElement>(null);
    const [disableControls, setDisableControls] = useState<boolean>(false);
    const [formOpacity, setFormOpacity] = useState<number>(1);
    const [showLoader, setShowLoader] = useState<boolean>(false);
    const [loginCommand, setLoginCommand] = useState<LoginCommand>(emptyLoginCommand);
    const [signupCommand, setSignupCommand] = useState<SingupCommand>(emptySignUpCommand);
    const [image, setImage] = useState<UploadFile>(emptyUploadFile);
    const [signupSuccess, setSignupSuccess] = useState<boolean>(false);
    const { setUserFromToken } = useUserContext();
    const [showImageCropper, setShowImageCropper] = useState<boolean>(false);
    const [croppedImage, setCroppedImage] = useState<string | null>(null);
    const [errorState, setErrorState] = useState<ErrorAlert>({
        showErrorAlert: false,
        errorAlertDescription: null
    });

    const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setDisableControls(true);
        setErrorState({
            showErrorAlert: false,
            errorAlertDescription: null
        });
        setFormOpacity(0.1);
        setShowLoader(true);
        axios.post(GetLoginEndpoint(), loginCommand)
            .then(response => {
                if (response.status == 200) {
                    setDisableControls(false);
                    setShowLoader(false);
                    setFormOpacity(1);
                    loginFormRef.current?.reset();
                    setLoginCommand(emptyLoginCommand);
                    try {
                        const loggedInUser = setUserFromToken(response.data);
                        if (loggedInUser && modalData.onLogin) modalData.onLogin(loggedInUser);
                    }
                    catch (error) {
                        console.log(error)
                    }
                    modalData.onHide();
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

    const handleSignup = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setDisableControls(true);
        setErrorState({
            showErrorAlert: false,
            errorAlertDescription: null
        });
        setFormOpacity(0.1);
        setShowLoader(true);
        axios.post(GetSignupEndpoint(), signupCommand)
            .then(response => {
                if (response.status == 200) {
                    setDisableControls(false);
                    setShowLoader(false);
                    setFormOpacity(1);
                    singupFormRef.current?.reset();
                    setSignupCommand(emptySignUpCommand);
                    setImage(emptyUploadFile);
                    setIsLoginMode(true);
                    setSignupSuccess(true);
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

    const addEmailToLoginCommand = (event: React.ChangeEvent<HTMLInputElement>) => {
        const updatedCommand = loginCommand;
        updatedCommand.email = event.target.value;
        setLoginCommand(updatedCommand);
    };

    const addPasswordToLoginCommand = (event: React.ChangeEvent<HTMLInputElement>) => {
        const updatedCommand = loginCommand;
        updatedCommand.password = event.target.value;
        setLoginCommand(updatedCommand);
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
            setImage({ content: fileBase64, name: event.target.files[0].name, index: 0});
            setShowImageCropper(true);
            //singupFormRef.current?.reset();
        }
    };

    const cropImageCallback = (image: string) => {
        setShowImageCropper(false);
        setCroppedImage(image);
        const updatedCommand = signupCommand;
        updatedCommand.profilePicture = image;
        setSignupCommand(updatedCommand);
    };

    const loginModeForm = <Form
        style={{ width: '100%', opacity: formOpacity }}
        ref={loginFormRef}
        onSubmit={handleLogin}>
        {errorState.showErrorAlert
            ? < DissmissableAlert
                title="Login Failed!"
                variant="danger"
                description={errorState.errorAlertDescription} />
            : null
        }
        {signupSuccess
            ? < DissmissableAlert
                title="Sign Up Successful!"
                variant="success"
                description="Please use your credentials to login." />
            : null
        }
        <Form.Group className="mb-4" controlId="formEmail">
            <Form.Control
                className="pink-placeholder"
                type="email"
                placeholder="Email"
                disabled={disableControls}
                onChange={addEmailToLoginCommand} />
        </Form.Group>
        <Form.Group className="mb-2" controlId="formPassword">
            <Form.Control
                className="pink-placeholder"
                type="password"
                placeholder="Password"
                disabled={disableControls}
                onChange={addPasswordToLoginCommand} />
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
                type="submit"
                disabled={disableControls}>
                Login
            </Button>
            <span className="semi-bold-font">
                OR
            </span>
            <Button
                variant="primary"
                className="admin-button my-2 light-font"
                style={{ width: '50%' }}
                onClick={() => setIsLoginMode(false)}
                disabled={disableControls} >
                Create an account
            </Button>
        </Stack>
    </Form>;

    const signupModeForm = <div>
            <div className="d-flex justify-content-center align-items-center mb-4">
            <img
                src={croppedImage ?? userImg}
                height="100vh"
                style={{ borderRadius: "50%" }} />
            </div>
            <Form
                style={{ width: '100%', opacity: formOpacity }}
                ref={singupFormRef}
                onSubmit={handleSignup}>
                {errorState.showErrorAlert
                    ? < DissmissableAlert
                        title="Signup Failed!"
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
                    <Form.Label className="semi-bold-font mb-1">
                        {croppedImage !== null ? "Change Picture" : "Upload Image"}
                    </Form.Label>
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
                        style={{ width: '70%' }}
                        type="submit">
                        Sign Up
                    </Button>
                    <Button
                        variant="primary"
                        className="admin-button my-2 light-font"
                        style={{ width: '70%' }}
                        onClick={() => setIsLoginMode(true)}>
                        Already a member?
                    </Button>
                </Stack>
            </Form>
        </div>;

    return <>
        <Modal
            {...modalData}
            dialogClassName="modal-90w"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Header className="light-pink" closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {isLoginMode ? "Login to KARUSC" : "Create New Account"}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="light-pink d-flex justify-content-center align-items-center px-4">
                {isLoginMode ? loginModeForm : signupModeForm}
            </Modal.Body>
            <Modal.Footer className="light-pink d-flex justify-content-center align-items-center">
                <GoogleAuthComponent />
            </Modal.Footer>
        </Modal>
        <ImageCropper
            aspectRatio={1}
            image={image.content}
            minWidth={150}
            circularCrop={true}
            callBack={cropImageCallback}
            show={showImageCropper} />
    </>;
}   