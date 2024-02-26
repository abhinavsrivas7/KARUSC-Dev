import { MouseEventHandler, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import ReactCrop, { Crop, centerCrop, convertToPixelCrop, makeAspectCrop } from "react-image-crop";

export type ImageCropperData = {
    aspectRatio: number,
    minWidth: number,
    image: string,
};

export const ImageCropper = ({ aspectRatio, minWidth, image }: ImageCropperData) => {
    const [crop, setCrop] = useState<Crop>();
    const imgRef = useRef<HTMLImageElement>(null);
    const hiddenAnchorRef = useRef<HTMLAnchorElement>(null);
    const blobUrlRef = useRef('');
    const previewCanvasRef = useRef<HTMLCanvasElement>(null);
      const [completedCrop, setCompletedCrop] = useState<PixelCrop>()

    
    const onImageLoad = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
        const { width, height } = event.currentTarget;
        console.log(width);
        console.log(height);
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
        setCrop(centerCrop(crop, width, height));
    };

    function getCroppedImageData(): MouseEventHandler<HTMLButtonElement> | undefined {
        const image = imgRef.current
        const previewCanvas = previewCanvasRef.current
        if (!image || !previewCanvas || !completedCrop) {
            throw new Error('Crop canvas does not exist')
        }
        const scaleX = image.naturalWidth / image.width
        const scaleY = image.naturalHeight / image.height

        const offscreen = new OffscreenCanvas(
            completedCrop.width * scaleX,
            completedCrop.height * scaleY,
        )
        const ctx = offscreen.getContext('2d')
        if (!ctx) {
            throw new Error('No 2d context')
        }

        ctx.drawImage(
            previewCanvas,
            0,
            0,
            previewCanvas.width,
            previewCanvas.height,
            0,
            0,
            offscreen.width,
            offscreen.height,
        )
        const blob = offscreen.convertToBlob({
            type: 'image/png',
        })

        if (blobUrlRef.current) {
            URL.revokeObjectURL(blobUrlRef.current)
        }
        blobUrlRef.current = URL.createObjectURL(blob)

        if (hiddenAnchorRef.current) {
            hiddenAnchorRef.current.href = blobUrlRef.current
            hiddenAnchorRef.current.click()
        }
    }

    return <div>
        <ReactCrop
            crop={crop}
            onChange={(pixelCrop, percentageCrop) => {
                const image = convertToPixelCrop(pixelCrop, 100, 100);
                console.log(image);
                setCrop(percentageCrop);
            }}
            circularCrop
            keepSelection
            aspect={aspectRatio}
            minWidth={minWidth}>
            <img
                src={image}
                style={{ maxHeight: "70vh" }}
                onLoad={onImageLoad} />
        </ReactCrop>
        <Button className="admin-button" onClick={getCroppedImageData()}>
            Accept Crop
        </Button>
    </div>;
}