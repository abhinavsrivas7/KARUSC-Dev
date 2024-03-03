import { useRef, useState } from "react";
import { Button, Container, Modal } from "react-bootstrap";
import
    ReactCrop,
    { Crop, PixelCrop, centerCrop, convertToPixelCrop, makeAspectCrop }
from "react-image-crop";
import { DissmissableAlert } from "./DissmissableAlert";


export type ImageCropperData = {
    show: boolean,
    aspectRatio: number,
    minWidth: number,
    image: string,
    circularCrop: boolean,
    callBack: (imageBase64: string) => void
};

type ErrorState = {
    show: boolean,
    message: string
};

export const ImageCropper = ({
    show,
    aspectRatio,
    minWidth,
    image,
    circularCrop,
    callBack
}: ImageCropperData) => {
    const [crop, setCrop] = useState<Crop>();
    const imgRef = useRef<HTMLImageElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
    const [error, setError] = useState<ErrorState>({ show: false, message: "" });
   
    const onImageLoad = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
        const { width, height } = event.currentTarget;
        const cropperWidth = (minWidth / width) * 100;
        const crop = makeAspectCrop(
            {
                unit: "%",
                width: cropperWidth
            },
            aspectRatio,
            width,
            height
        );

        const image = imgRef.current;
        if (image?.width && image?.height) {
            if (image.width < minWidth || image.height < (minWidth / aspectRatio)) {
                setError({
                    show: true,
                    message: `Image is too small. Please upload a minimum size of ${minWidth}x${minWidth / aspectRatio}.`
                });
            }
            setCrop(centerCrop(crop, width, height));
            const pixelCrop = convertToPixelCrop(crop, width, height);
            pixelCrop.x = ((image?.width ?? 0) - minWidth) / 2;
            pixelCrop.y = ((image?.height ?? 0) - (minWidth / aspectRatio)) / 2;
            setCompletedCrop(pixelCrop);
        }
        else {
            setError({
                show: true,
                message: `Invalid image uploaded.`
            });
        }
    };

    const getCroppedImageData = () => {       
        const image = imgRef.current;
        const canvas = canvasRef.current;

        if (!image || !canvas || !completedCrop) {
            throw new Error('Crop canvas does not exist');
        }

        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error('No 2d context');

        const pixelRatio = window.devicePixelRatio;
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = Math.floor(completedCrop.width * scaleX * pixelRatio);
        canvas.height = Math.floor(completedCrop.height * scaleY * pixelRatio);
        ctx.scale(pixelRatio, pixelRatio);
        ctx.imageSmoothingQuality = "high";
        ctx.save();

        const cropX = completedCrop.x * scaleX;
        const cropY = completedCrop.y * scaleY;
        ctx.translate(-cropX, -cropY);

        ctx.drawImage(
            image,
            0,
            0,
            image.naturalWidth,
            image.naturalHeight,
            0,
            0,
            image.naturalWidth,
            image.naturalHeight
        );

        ctx.restore();
        callBack(canvas.toDataURL('image/jpeg'));
    }

    return <Modal
        show={show}
        dialogClassName="modal-90w"
        aria-labelledby="contained-modal-title-vcenter"
        centered
    >
        <Modal.Header className="light-pink" closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
                Crop Image
            </Modal.Title>
        </Modal.Header>
        <Modal.Body className="light-pink d-flex justify-content-center align-items-center px-4">
            {error.show
                ? < DissmissableAlert
                    title={error.message}
                    variant="danger"
                    description={null} />           
                : <>
                    <ReactCrop
                        crop={crop}
                        onChange={(pixelCrop, percentCrop) => {
                            console.log(pixelCrop);
                            console.log(percentCrop);
                            setCompletedCrop(pixelCrop);
                            setCrop(percentCrop);
                        }}
                        circularCrop={circularCrop}
                        keepSelection
                        aspect={aspectRatio}
                        minWidth={minWidth}>
                        <img
                            ref={imgRef}
                            src={image}
                            style={{ maxHeight: "70vh" }}
                            onLoad={onImageLoad} />
                    </ReactCrop>
                    <canvas
                        ref={canvasRef}
                        style={{
                            objectFit: 'contain',
                            width: completedCrop?.width,
                            height: completedCrop?.height,
                            display: "none"
                        }}
                    />
                </>}              
        </Modal.Body>
        <Modal.Footer className="light-pink d-flex justify-content-center align-items-center">
            <Container className="d-flex justify-content-center align-items-center mt-3">
                <Button className="admin-button" onClick={getCroppedImageData} disabled={error.show}>Save</Button>
            </Container>
        </Modal.Footer>
    </Modal>;
}