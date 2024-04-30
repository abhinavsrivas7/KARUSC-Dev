import { useState } from "react";
import unchecked from "../../../resources/media/empty-check.svg";
import checked from "../../../resources/media/filled-check.svg";


export const KaruscCheckbox = () => {
    const [checkboxState, setCheckboxState] = useState<boolean>(false);

    return <div className="p-0 m-0" onClick={() => setCheckboxState(!checkboxState)}>
        <img height="15" src={checkboxState ? checked : unchecked} />
    </div>;
}

