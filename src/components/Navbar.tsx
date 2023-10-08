import { useState } from "react";
import { Button, Col, Container, Form, Nav, Navbar as NavbarBs, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { IsMobile } from "../utilities/IsMobile";
import { SearchBar } from "./SearchBar";
import image  from "../media/user.svg";

export const Navbar = () => {
    const [isSearchActive, setSearchActive] = useState<boolean>(false);
    const isMobile = IsMobile();

    const searchInactiveLayout = <>
        <Button 
            style={{ width: "3rem", height: "3rem", position: "relative" }} 
            variant="white"
            className="mb-1">
            <svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 23 23" xmlns="http://www.w3.org/2000/svg">
                <path d="m13 16.745c0-.414-.336-.75-.75-.75h-9.5c-.414 0-.75.336-.75.75s.336.75.75.75h9.5c.414 0 .75-.336.75-.75zm9-5c0-.414-.336-.75-.75-.75h-18.5c-.414 0-.75.336-.75.75s.336.75.75.75h18.5c.414 0 .75-.336.75-.75zm-4-5c0-.414-.336-.75-.75-.75h-14.5c-.414 0-.75.336-.75.75s.336.75.75.75h14.5c.414 0 .75-.336.75-.75z" fill-rule="nonzero"/>
            </svg>
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
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                    <path d="M21.172 24l-7.387-7.387c-1.388.874-3.024 1.387-4.785 1.387-4.971 0-9-4.029-9-9s4.029-9 9-9 9 4.029 9 9c0 1.761-.514 3.398-1.387 4.785l7.387 7.387-2.828 2.828zm-12.172-8c3.859 0 7-3.14 7-7s-3.141-7-7-7-7 3.14-7 7 3.141 7 7 7z"/>
                </svg>
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
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                                <path d="M21.172 24l-7.387-7.387c-1.388.874-3.024 1.387-4.785 1.387-4.971 0-9-4.029-9-9s4.029-9 9-9 9 4.029 9 9c0 1.761-.514 3.398-1.387 4.785l7.387 7.387-2.828 2.828zm-12.172-8c3.859 0 7-3.14 7-7s-3.141-7-7-7-7 3.14-7 7 3.141 7 7 7z"/>
                            </svg>
                        </Button>
                    </Col>
                </Row>
               </Form>}       
        <Button 
            style={{ width: "3rem", height: "3rem", position: "relative" }} 
            variant="white"
            className="mb-1 ms-3">
            <img src={image} height="22rem"/>
        </Button>
        <Button 
            style={{ width: "3rem", height: "3rem", position: "relative" }} 
            variant="white"
            className="mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path d="M10 19.5c0 .829-.672 1.5-1.5 1.5s-1.5-.671-1.5-1.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5zm3.5-1.5c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5c0-.828-.672-1.5-1.5-1.5zm1.336-5l1.977-7h-16.813l2.938 7h11.898zm4.969-10l-3.432 12h-12.597l.839 2h13.239l3.474-12h1.929l.743-2h-4.195z"/>
            </svg>
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
                        <svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="m9.474 5.209s-4.501 4.505-6.254 6.259c-.147.146-.22.338-.22.53s.073.384.22.53c1.752 1.754 6.252 6.257 6.252 6.257.145.145.336.217.527.217.191-.001.383-.074.53-.221.293-.293.294-.766.004-1.057l-4.976-4.976h14.692c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-14.692l4.978-4.979c.289-.289.287-.761-.006-1.054-.147-.147-.339-.221-.53-.221-.191-.001-.38.071-.525.215z" fill-rule="nonzero"/>
                        </svg>
                    </Button>
                    <SearchBar />
                </>
                : searchInactiveLayout}               
        </Container>
    </NavbarBs>;
};