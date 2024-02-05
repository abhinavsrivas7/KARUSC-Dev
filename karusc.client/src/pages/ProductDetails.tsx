import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const ProductDetails = () => {
    const navigate = useNavigate();
    const [id, setId] = useState<string>("");

    useEffect(() => {
        try {
            setId(window.location.href.split('/')?.slice(-1)[0]?.split('?')[1].split('=')[1]);
        }
        catch {
            navigate("/");
        }
    }, []);
    
    return <>Hello World {id}</>;
}
