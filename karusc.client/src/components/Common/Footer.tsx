import facebookLogo from "../../../resources/media/facebook.svg"
import instagramLogo from "../../../resources/media/instagram.svg"
import youtubeLogo from "../../../resources/media/youtube.svg"
import pinterestLogo from "../../../resources/media/pinterest.svg"
import { Col, Row, Stack } from "react-bootstrap"
import { Link } from "react-router-dom"

export const Footer = () => {
    return <>
        <footer
            className="purple"
            style={{
                bottom: "0",
                left: "0",
                width: "100%",
                padding: "0.35rem"
            }}>
            <Row xs={2} md={2} lg={2} style={{ width: '100%', margin: '0' }} className="mb-5">
                <Col style={{ padding: '0', margin: '0' }}>
                    <div className="d-flex justify-content-center align-items-center extra-light-font">
                        <div>
                            <p className="semi-bold-font">Links</p>
                            <Link style={{ textDecoration: 'none', color: 'white' }} to="/">
                                <p>Privacy Policy</p>
                            </Link>
                            <Link style={{ textDecoration: 'none', color: 'white' }} to="/">
                                <p>Return & Exchange</p>
                            </Link>
                            <Link style={{ textDecoration: 'none', color: 'white' }} to="/">
                                <p>Shipping & Delivery</p>
                            </Link>
                        </div>
                    </div>
                </Col>
                <Col style={{ padding: '0', margin: '0' }}>
                    <div className="d-flex justify-content-center align-items-center extra-light-font">
                        <div>
                            <p className="semi-bold-font">Info</p>
                            <Link style={{ textDecoration: 'none', color: 'white' }} to="/">
                                <p>About Us</p>
                            </Link>
                            <Link style={{ textDecoration: 'none', color: 'white' }} to="/">
                                <p>Bulk Orders</p>
                            </Link>
                            <Link style={{ textDecoration: 'none', color: 'white' }} to="/">
                                <p>International Orders</p>
                            </Link>
                        </div>
                    </div>
                </Col>   
            </Row>
            <div className="d-flex justify-content-center align-items-center bold-font">
                <h4>KARUSC</h4>
            </div>
            <div className="d-flex justify-content-center align-items-center extra-light-font mb-2">
                Karusc is an affordable jewellery brand.
            </div>
            <Stack
                direction="horizontal"
                gap={3}
                className="d-flex justify-content-center align-items-center mb-4">
                <a href="https://www.facebook.com"><img src={facebookLogo} /></a>
                <a href="https://www.instagram.com"><img src={instagramLogo} /></a>
                <a href="https://www.youtube.com"><img src={youtubeLogo} /></a>
                <a href="https://www.pinterest.com"><img src={pinterestLogo} /></a>
            </Stack>
            <div className="d-flex justify-content-center align-items-center thin-font">
                &#169; 2023 Karusc
            </div>
        </footer>
    </>;
}