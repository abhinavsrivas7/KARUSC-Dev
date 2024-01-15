import { Button, Container, Nav, Navbar as NavbarBs, } from "react-bootstrap";
import backArrowImg from "../../../resources/media/backArrow.svg";
import userImg from "../../../resources/media/user.svg";
import hamburgImg from "../../../resources/media/hamburg.svg";
import searchImg from "../../../resources/media/search.svg";
import cartImg from "../../../resources/media/cart.svg";
import { useState } from "react";
import { SearchBar } from "./SearchBar";
import { NavLink } from "react-router-dom";

export const Navbar = () => {
    const [isSearchActive, setSearchActive] = useState<boolean>(false);

    const searchInactiveLayout = <>
        <Button
            style={{ width: "3rem", height: "3rem", position: "relative" }}
            variant="white"
            className="mb-1">
            <img src={hamburgImg} />
        </Button>
        <Nav className="me-auto">
            <Nav.Link to="/" as={NavLink} style={{ fontSize: "1.25em" }} className="light-pink semi-bold-font">
                <strong>KARUSC</strong>
            </Nav.Link>
        </Nav>
        <Button
                style={{ width: "2.25rem", height: "3rem", position: "relative" }}
                variant="white"
                onClick={() => setSearchActive(true)}>
                <img src={searchImg} />
        </Button>
        <Button
            style={{ width: "3rem", height: "3rem", position: "relative" }}
            variant="white"
            className="mb-1 ms-3">
            <img src={userImg} height="22rem" />
        </Button>
        <Button
            style={{ width: "3rem", height: "3rem", position: "relative" }}
            variant="white">
            <img src={cartImg} />
        </Button>
    </>;

    const searchActiveLayout = <>
        <Button
            style={{ width: "3rem", height: "3rem", position: "relative" }}
            variant="white"
            className="mb-1"
            onClick={() => setSearchActive(false)}>
            <img src={backArrowImg} />
        </Button>
        <SearchBar />
    </>;

    return <NavbarBs className="shadow-sm mt-4 pb-0 light-pink" sticky="top">
        <Container>
            {isSearchActive ? searchActiveLayout : searchInactiveLayout}
        </Container>
    </NavbarBs>;
}

