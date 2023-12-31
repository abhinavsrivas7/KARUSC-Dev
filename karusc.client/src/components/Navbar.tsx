import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Nav, Navbar as NavbarBs, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { SearchBar } from "./SearchBar";
import userImg  from "../../resources/media/user.svg";
import hamburgImg from "../../resources/media/hamburg.svg";
import searchImg from "../../resources/media/search.svg";
import cartImg from "../../resources/media/cart.svg";
import backArrowImg from "../../resources/media/backArrow.svg";

export const Navbar = () => {
    const [isSearchActive, setSearchActive] = useState<boolean>(false);
    const [isMobile, setisMobile] = useState<boolean>(window.innerWidth < 768);
    const handleResize = () => setisMobile(window.innerWidth < 768);

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const searchInactiveLayout = <>
        <Button 
            style={{ width: "3rem", height: "3rem", position: "relative" }} 
            variant="white"
            className="mb-1">
            <img src={hamburgImg}/>
        </Button>
        <Nav className="me-auto">
            <Nav.Link to="/" as={NavLink} style={{fontSize: "1.25em"}}>
                <strong>KARUSC</strong>
            </Nav.Link>
        </Nav>
        {isMobile
            ? <Button 
                style={{ width: "2.25rem", height: "3rem", position: "relative" }} 
                variant="white"
                onClick={() => setSearchActive(true)}>
                <img src={searchImg} />
              </Button>
            : <Form>
                <Row>
                    <Col xs="auto"  style={{position: "relative", transform: "translate(27%, 0%)"}}>
                        <Form.Control
                            type="text"
                            placeholder="Search"
                            className=" mr-sm-2 search-input" />
                    </Col>
                    <Col xs="auto" style={{position: "relative"}}>
                        <Button variant="white" style={{width: "2.25rem",height: "2.25rem"}}>
                            <img src = {searchImg} />
                        </Button>
                    </Col>
                </Row>
               </Form>}       
        <Button 
            style={{ width: "3rem", height: "3rem", position: "relative" }} 
            variant="white"
            className="mb-1 ms-3">
            <img src={userImg} height="22rem"/>
        </Button>
        <Button 
            style={{ width: "3rem", height: "3rem", position: "relative" }} 
            variant="white"
            className="mb-2">
            <img src = {cartImg} />
            <div 
                className="rounded-circle bg-dark d-flex justify-content-center align-items-center"
                style={{
                    color: "white",
                    width: "1.25rem",
                    height: "1.25rem", 
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    transform: "translate(-4%, -4%)",
                    fontSize: "0.8em"
                }}>
                <strong>25</strong>
            </div>
        </Button> 
    </>;

    return <NavbarBs className="bg-white shadow-sm mb-3 pb-0" sticky="top">
        <Container>
            {isSearchActive 
                ? <>
                    <Button 
                        style={{ width: "3rem", height: "3rem", position: "relative"}} 
                        variant="white"
                        className="mb-1"
                        onClick={() => setSearchActive(false)}>
                        <img src = {backArrowImg} />
                    </Button>
                    <SearchBar />
                </>
                : searchInactiveLayout}               
        </Container>
    </NavbarBs>;
};