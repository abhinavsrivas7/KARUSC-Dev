import { useState } from "react";
import { Alert } from "react-bootstrap";

export interface AlertData  {
    title: string | null,
    description: string | null,
    variant: string
}

export const DissmissableAlert = ({ title, description, variant }: AlertData) => {
    const [show, setShow] = useState<boolean>(true);
    return show ?
        <Alert variant={variant} onClose={() => setShow(false)} dismissible>
            {title != null ? <Alert.Heading>{title}</Alert.Heading> : null}
            {description != null ? <p>{description}</p> : null}
        </Alert>
        : null;
}
