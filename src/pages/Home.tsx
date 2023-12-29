import { Button, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import forwardArrowImg from "../../resources/media/forwArrow.svg";
import { GoogleAuthComponent } from "../components/GoogleAuthComponent";

export const Home = () => {
    return <Container className="d-flex justify-content-center align-items-center w-100">
        <NavLink to="/shop">
            <Button className="hoverButton" variant="outline-dark">
                Shop Now!!
                <div style={{
                    display: "inline-block",
                    width: "1.1rem",
                    height: "1.1rem",
                    marginLeft: "0.3em"}}>
                    <img src = {forwardArrowImg} />
                </div>
            </Button>
        </NavLink>
        <NavLink to="/admin">
            <Button variant = "outline-dark">
                Go to Admin
            </Button>
        </NavLink>
        <GoogleAuthComponent/> 
    </Container>;
}