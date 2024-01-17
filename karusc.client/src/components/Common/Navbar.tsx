import { Button, Container, Nav, Navbar as NavbarBs, Stack, } from "react-bootstrap";
import backArrowImg from "../../../resources/media/backArrow.svg";
import userImg from "../../../resources/media/user.svg";
import hamburgImg from "../../../resources/media/hamburger.svg";
import searchImg from "../../../resources/media/search.svg";
import cartImg from "../../../resources/media/cart.svg";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useScreenSize } from "../../context/ScreenSizeContext";
import { DeviceTypes } from "../../models/DeviceTypes";

export const Navbar = () => {
    const [isSearchActive, setSearchActive] = useState<boolean>(false);
    const { getDeviceType } = useScreenSize();

    const searchInactiveLayout = <>
        <Stack direction="horizontal" gap={2} className="me-auto">
            <Button variant="white" style={{ width: '1.5rem', padding: 0, border: 0 }}>
                <img src={hamburgImg}/>
            </Button>
            <Nav>
                <Nav.Link to="/" as={NavLink} className="extra-bold-font light-pink px-0 py-0">KARUSC</Nav.Link>
            </Nav>
        </Stack>
        <Stack direction="horizontal" gap={3} className="ms-auto">
            <Button
                onClick={() => setSearchActive(true)}
                variant="white"
                style={{ width: '1.45rem', padding: 0, border: 0 }}>
                <img src={searchImg} />
            </Button>
            <Button variant="white" style={{ width: '1.5rem', padding: 0, border: 0 }}>
                <img src={userImg} />
            </Button>
            <Button variant="white" style={{ width: '1.75rem', padding: 0, border: 0 }}>
                <img src={cartImg} />
            </Button>
        </Stack>
    </>;

    const searchActiveLayout = <>
        <Stack direction="horizontal" className="me-auto">
            <Button
                onClick={() => setSearchActive(false)}
                variant="white"
                style={{ width: '1.5rem', padding: 0, border: 0 }}>
                <img src={backArrowImg} />
            </Button>
        </Stack>
        <Container>
            <input className="pink-placeholder" style={{ width: "100%" }} placeholder="Search..."></input>
        </Container>
        <Stack direction="horizontal" className="ms-auto">
            <Button
                onClick={() => setSearchActive(false)}
                variant="white"
                style={{ width: '1.45rem', padding: 0, border: 0 }}>
                <img src={searchImg} />
            </Button>
        </Stack>
    </>;

    const navbarClass = getDeviceType() == DeviceTypes.MOBILE
        ? "shadow-sm mt-4 px-3 py-2.75 light-pink"
        : "shadow-sm mt-4 px-4 py-2.75 light-pink";

    return <NavbarBs className={navbarClass} sticky="top">
            {isSearchActive ? searchActiveLayout : searchInactiveLayout}
    </NavbarBs>;
}

