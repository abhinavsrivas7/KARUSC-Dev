import { useState } from "react";
import { Alert } from "react-bootstrap";

export interface AlertData  {
    title: string | null,
    description: string | null,
}

export const DissmissableAlert = ({ title, description }: AlertData) => {
    const [show, setShow] = useState<boolean>(true);
    return show ?
        <Alert variant="danger" onClose={() => setShow(false)} dismissible>
            {title != null ? <Alert.Heading>{title}</Alert.Heading> : null}
            {description != null ? <p>{description}</p> : null}
        </Alert>
        : null;
}
