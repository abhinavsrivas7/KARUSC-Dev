import facebookLogo from "../../../resources/media/facebook.svg"
import instagramLogo from "../../../resources/media/instagram.svg"
import youtubeLogo from "../../../resources/media/youtube.svg"
import pinterestLogo from "../../../resources/media/pinterest.svg"
import { Col, Row, Stack } from "react-bootstrap"
import { Link } from "react-router-dom"
import { DeviceTypes } from "../../models/DeviceTypes"
import { useScreenSize } from "../../hooks/useScreenSize"

export const Footer = () => {
    const { getDeviceType } = useScreenSize();
    const rowClass = getDeviceType() == DeviceTypes.MOBILE || getDeviceType() == DeviceTypes.MINI_MOBILE ? "mb-5 px-2" : "mb-5 px-5";

    return <footer
        className="purple px-0 py-3 extra-light-font"
        style={{
            bottom: "0",
            left: "0",
            width: "100%"
        }}>
        <Row xs={2} md={2} lg={2} style={{ width: '100%', margin: '0' }} className={rowClass}>
            <Col style={{ padding: '0', margin: '0' }}>
                <div className="d-flex justify-content-start">
                    <div>
                        <p className="semi-bold-font">Links</p>
                        <Link style={{ textDecoration: 'none', color: 'white' }} to="/PrivacyPolicy">
                            <p className="mb-1">Privacy Policy</p>
                        </Link>
                        <Link style={{ textDecoration: 'none', color: 'white' }} to="/ReturnAndExchange">
                            <p className="mb-1">Return & Exchange</p>
                        </Link>
                        <Link style={{ textDecoration: 'none', color: 'white' }} to="/ShippingAndDelivery">
                            <p>Shipping & Delivery</p>
                        </Link>
                    </div>
                </div>
            </Col>
            <Col style={{ padding: '0', margin: '0' }}>
                <div className="d-flex justify-content-end">
                    <div>
                        <p className="semi-bold-font">Info</p>
                        <Link style={{ textDecoration: 'none', color: 'white' }} to="/About">
                            <p className="mb-1">About Us</p>
                        </Link>
                        <Link style={{ textDecoration: 'none', color: 'white' }} to="/">
                            <p className="mb-1">Bulk Orders</p>
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
        <div className="d-flex justify-content-center align-items-center mb-2">
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
    </footer>;
}