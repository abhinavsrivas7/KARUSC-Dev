import { Button, Form } from "react-bootstrap";
import { ErrorAlert, UploadFile } from "../../../models/AdminModels";
import { useRef, useState } from "react";
import { ConvertToBase64 } from "../../../utilities/FileUtils";
import { GetHomeCarouselImageEndpoint } from "../../../utilities/EndpointUtils";
import axios from "axios";
import { DissmissableAlert } from "../../Common/DissmissableAlert";
import { Loader } from "../../Common/Loader";
import { ImageCropper } from "../../Common/ImageCropper";

export const AddHomeCarouselImage = () => {
    const emptyUploadFile: UploadFile = { content: "", name: "", index: -1 };
    const formRef = useRef<HTMLFormElement>(null);
    const [disableControls, setDisableControls] = useState<boolean>(false);
    const [formOpacity, setFormOpacity] = useState<number>(1);
    const [showSuccessAlert, setShowSuccessAlert] = useState<boolean>(false);
    const [showLoader, setShowLoader] = useState<boolean>(false);
    const [image, setImage] = useState<UploadFile>(emptyUploadFile);
    const [showImageCropper, setShowImageCropper] = useState<boolean>(false);

    const [errorState, setErrorState] = useState<ErrorAlert>({
        showErrorAlert: false,
        errorAlertDescription: null
    });

    const cropImageCallback = (returnedCroppedImage: string) => {
        setShowImageCropper(false);
        if (returnedCroppedImage !== null) {
            setImage({ content: returnedCroppedImage, name: image.name, index: 0 });
        }
    }

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
        axios.post(GetHomeCarouselImageEndpoint(), { image: image.content })
            .then(response => {
                if (response.status == 201) {
                    setDisableControls(false);
                    setShowSuccessAlert(true);
                    setShowLoader(false);
                    setFormOpacity(1);
                    formRef.current?.reset();
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



    return <>
    <Form ref={formRef} onSubmit={handleSubmit} style={{ opacity: formOpacity }}>
        {showSuccessAlert
            ? < DissmissableAlert
                title="Home Carousel Image Added Successfully!"
                variant="success"
                description={null} />
            : null
        }
        {errorState.showErrorAlert
            ? < DissmissableAlert
                title="Home Carousel Image Could Not Be Added!"
                variant="danger"
                description={errorState.errorAlertDescription} />
            : null
        }
        <Form.Group className="mb-4" controlId="formImage">
            <Form.Label className="semi-bold-font mb-1">
                {image.content !== null ? "Change Picture" : "Upload Image"}
            </Form.Label>
            {image.content !== null
                ? <div className="my-2">
                    <img src={image.content} height="70vh" />
                </div>
                : null
            }
            <Form.Control
                className="pink-placeholder"
                type="file"
                onChange={addImage}
                disabled={disableControls}
                defaultValue={image.content} />
        </Form.Group>
        {showLoader ? <Loader /> : null}
        <Button
            variant="primary"
            className="admin-button mt-4"
            style={{ width: '100%' }}
            type="submit"
            disabled={disableControls} >
            Add Carousel Image
        </Button>
    </Form>;
    <ImageCropper
        aspectRatio={3.67}
        image={image.content}
        minWidth={250}
        circularCrop={false}
        callBack={cropImageCallback}
        show={showImageCropper} />
    </>
}

