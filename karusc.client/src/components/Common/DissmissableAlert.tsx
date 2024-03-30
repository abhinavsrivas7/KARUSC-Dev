import { useState } from "react";
import { Alert } from "react-bootstrap";

export interface AlertData  {
    title: string | null,
    description: string | null,
    variant: string,
    onClose?: (() => void)
}

export const DissmissableAlert = ({ title, description, variant, onClose }: AlertData) => {
    const [show, setShow] = useState<boolean>(true);

    const handleClose = () => {
        if (onClose) onClose();
        setShow(false);
    }

    return show ?
        <Alert variant={variant} onClose={handleClose} dismissible>
            {title != null ? <Alert.Heading>{title}</Alert.Heading> : null}
            {description != null ? <p>{description}</p> : null}
        </Alert>
        : null;
}
