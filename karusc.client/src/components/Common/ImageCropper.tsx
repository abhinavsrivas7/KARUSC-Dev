import { useState } from "react";
import { Button } from "react-bootstrap";
import ReactCrop, { Crop, centerCrop, makeAspectCrop } from "react-image-crop";

export type ImageCropperData = {
    aspectRatio: number,
    minWidth: number,
    image: string,
};

export const ImageCropper = ({ aspectRatio, minWidth, image }: ImageCropperData) => {
    const [crop, setCrop] = useState<Crop>();
    
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

    return <div>
        <ReactCrop
            crop={crop}
            onChange={(_, percentageCrop) => setCrop(percentageCrop)}
            circularCrop
            keepSelection
            aspect={aspectRatio}
            minWidth={minWidth}>
            <img
                src={image}
                style={{ maxHeight: "70vh" }}
                onLoad={onImageLoad} />
        </ReactCrop>
    </div>;
}