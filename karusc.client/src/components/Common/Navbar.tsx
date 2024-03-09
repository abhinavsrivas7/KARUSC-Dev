import {
    Button,
    Dropdown,
    Nav,
    Navbar as NavbarBs,
    Image as ImageBs,
    Offcanvas,
    Stack
} from "react-bootstrap";
import backArrowImg from "../../../resources/media/backArrow.svg";
import userImg from "../../../resources/media/user.svg";
import hamburgImg from "../../../resources/media/hamburger.svg";
import searchImg from "../../../resources/media/search.svg";
import cartImg from "../../../resources/media/cart.svg";
import closeImg from "../../../resources/media/close.svg";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useScreenSize } from "../../context/ScreenSizeContext";
import { DeviceTypes } from "../../models/DeviceTypes";
import { LoginModal } from "../Authentication/LoginModal";
import { useUserContext } from "../../hooks/useUserHook";
import { Search } from "../../models/SearchModels";
import axios from "axios";
import { GetSearchEndpoint } from "../../utilities/EndpointUtils";
import { ReactSearchAutocomplete } from "react-search-autocomplete";

export const Navbar = () => {
    const [isSearchActive, setSearchActive] = useState<boolean>(false);
    const [showMenuDrawer, setShowMenuDrawer] = useState<boolean>(false);
    const [showCartDrawer, setShowCartDrawer] = useState<boolean>(false);
    const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
    const [searchResults, setSearchResults] = useState<Search[]>([]);
    const { getDeviceType } = useScreenSize();
    const { getUser, logOut } = useUserContext();
    const user = getUser();
    const navigate = useNavigate();

    const getSearchResults = (searchTerm: string) => {
        if (searchTerm && searchTerm !== '') {
            axios.get(GetSearchEndpoint(), {
                params: {
                    text: searchTerm,
                    resultSize: 5
                }
            }).then(response => setSearchResults(response.data));
        }      
    };

    const handleSelectedSearchOption = (selectedOption: Search) => {
        let path: string;

        switch (selectedOption.resultType) {
            case 'Category': path = 'Categories';
                break;
            case 'Collection': path = 'Collections'
                break;
            default: throw new Error("Invalid search result type")
        }

        setSearchActive(false);
        navigate(`/ProductList?${path}=${selectedOption.id}`);        
    };

    const handleLogout = () => {
        logOut();
    };

    const searchInactiveLayout = <>
        <Stack direction="horizontal" gap={2} className="me-auto">
            <Button
                variant="white"
                style={{ width: '1.5rem', padding: 0, border: 0 }}
                onClick={() => setShowMenuDrawer(true)}>
                <img src={hamburgImg}/>
            </Button>
            <Nav>
                <Nav.Link
                    to="/"
                    as={NavLink}
                    className="extra-bold-font light-pink mx-0 px-0 py-0">
                    KARUSC
                </Nav.Link>
            </Nav>
        </Stack>
        <Stack direction="horizontal" gap={3} className="ms-auto">
            <Button
                onClick={() => setSearchActive(true)}
                variant="white"
                style={{ width: '1.45rem', padding: 0, border: 0 }}>
                <img src={searchImg} />
            </Button>
            {
                user === null
                    ? <Button
                        variant="white"
                        style={{ width: '1.5rem', padding: 0, border: 0 }}
                        onClick={() => setShowLoginModal(true)}>
                        <img src={userImg} />
                    </Button>
                    : <Dropdown align="end">
                        <Dropdown.Toggle variant="white" className="light-pink">
                            <img height="25" style={{ borderRadius: "50%" }} src={user.profilePictureUrl} />
                        </Dropdown.Toggle>

                        <Dropdown.Menu className="light-pink">
                            <Dropdown.Item className="light-pink">
                                Change Picture
                            </Dropdown.Item>
                            <Dropdown.Item onClick={handleLogout} className="light-pink">
                                Logout
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
            }
            
            <Button
                onClick={() => setShowCartDrawer(true)}
                variant="white"
                style={{ width: '1.75rem', padding: 0, border: 0 }}>
                <img src={cartImg} />
            </Button>
        </Stack>
    </>;

    const searchActiveLayout = <>
        <Stack direction="horizontal" className="me-auto w-100" gap={2}>
            <Button
                onClick={() => setSearchActive(false)}
                variant="white"
                style={{ width: '1.5rem', padding: 0, border: 0 }}>
                <img src={backArrowImg} />
            </Button>
            <div style={{ width: '100%' }} className="mb-4 py-1">
                <ReactSearchAutocomplete<Search>
                    items={searchResults}
                    onSearch={getSearchResults}
                    styling={{
                        height: '2rem',
                        backgroundColor: '#FFF3F5',
                        placeholderColor: 'rgba(158, 45, 79, 0.56)',
                        color: 'rgba(158, 45, 79, 0.56)',
                        iconColor: 'rgba(158, 45, 79, 0.56)',
                        lineColor: 'rgba(158, 45, 79, 0.56)',
                        borderRadius: '0px',
                        border: "0",
                        boxShadow: "rgba(158, 45, 79, 0.56) 0px 1px 6px 0px"
                    }}
                    placeholder="Search..."
                    showIcon={false}
                    resultStringKeyName="title"
                    fuseOptions={{ keys: [ "title" ] }}
                    onSelect={handleSelectedSearchOption}
                    formatResult={(result: Search) => <span>{result.title}</span>} />
            </div>
            
        </Stack>

    </>;

    const navbarClass = getDeviceType() == DeviceTypes.MOBILE
        ? "shadow-sm px-3 py-2.75 light-pink"
        : "shadow-sm px-4 py-4.75 light-pink";

    return (
        <>
            <NavbarBs className={navbarClass} sticky="top">
                {isSearchActive ? searchActiveLayout : searchInactiveLayout}
            </NavbarBs>
            <Offcanvas
                className="light-pink"
                show={showMenuDrawer}
                onHide={() => setShowMenuDrawer(false)}>
                <Offcanvas.Header>
                    <h1 className="extra-bold-font">KARUSC</h1>
                    <Button
                        onClick={() => setShowMenuDrawer(false)}
                        className="pt-0"
                        variant="white"
                        style={{ border: '0' }}>
                        <img src={closeImg} />
                    </Button>
                </Offcanvas.Header>
                <Offcanvas.Body className="pt-0">
                    {user !== null
                        ? <><Stack
                            className="p-2 purple"
                            direction="horizontal"
                            gap={2}
                            style={{ border: "1px solid" }}>
                            <div>
                                <ImageBs
                                    height="60vh"
                                    src={user.profilePictureUrl}
                                    roundedCircle />
                            </div>
                            <Stack direction="vertical" gap={0}>
                                <div className="bold-font ps-1 pt-1 pb-0 mb-0">
                                    {user.name}
                                </div>
                                <div className="thin-font px-1">
                                    <Button
                                        onClick={() => setShowMenuDrawer(false)}
                                        variant="white"
                                        className="admin-button ps-0 pt-0">
                                        View Profile
                                    </Button> 
                                </div>
                            </Stack>
                        </Stack>
                        <hr /></>
                        : null}
                    <ul>
                        <li>
                            <NavLink
                                style={{ textDecoration: 'none' }}
                                to="/"
                                onClick={() => setShowMenuDrawer(false)}
                                className="regular-font light-pink"                            >
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                style={{ textDecoration: 'none' }}
                                to="/ProductList"
                                onClick={() => setShowMenuDrawer(false)}
                                className="regular-font light-pink"                            >
                                Product List
                            </NavLink>
                        </li>
                        {user?.role === 1 ?
                            <li>
                                <NavLink
                                    style={{ textDecoration: 'none' }}
                                    to="/Admin"
                                    onClick={() => setShowMenuDrawer(false)}
                                    className="regular-font light-pink"                            >
                                    Admin
                                </NavLink>
                            </li>
                            : null}
                    </ul>
                </Offcanvas.Body>
            </Offcanvas>
            <Offcanvas
                placement="end"
                className="light-pink"
                show={showCartDrawer}
                onHide={() => setShowCartDrawer(false)}>
                <Offcanvas.Header>
                    <h2>Cart</h2>
                </Offcanvas.Header>
                <Offcanvas.Body className="pt-0">
                </Offcanvas.Body>
            </Offcanvas>
            <LoginModal show={showLoginModal} onHide={() => setShowLoginModal(false)} />
        </>
    );
}

