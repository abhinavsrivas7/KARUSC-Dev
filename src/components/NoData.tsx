import { Button } from "react-bootstrap";
import noDataImg  from "../../resources/media/noData.svg";
import { NavLink } from "react-router-dom";
import backArrowImg from "../../resources/media/backArrow.svg";

export const NoData = () => <>
    <div className="d-flex justify-content-center align-items-center">          
        <img src={noDataImg} height={500}/>
    </div>
    <div className="d-flex justify-content-center align-items-center">
        <NavLink to="/">
            <Button
                className="hoverButton" 
                variant="outline-light">
                <div style={{
                    display: "inline-block",
                    width: "1.1rem",
                    height: "1.1rem",
                    marginRight: "0.3em"}}>
                    <img src = {backArrowImg} />
                </div>
                Back to Home
            </Button>
        </NavLink>
    </div>
</>;