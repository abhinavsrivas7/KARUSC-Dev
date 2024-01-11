import facebookLogo from "../../../resources/media/facebook.svg"
import instagramLogo from "../../../resources/media/instagram.svg"
import youtubeLogo from "../../../resources/media/youtube.svg"
import pinterestLogo from "../../../resources/media/pinterest.svg"
import { Stack } from "react-bootstrap"

export const Footer = () => {
    return <>
        <footer className="purple"
            style={{
            bottom: "0",
            left: "0",
            width: "100%"
        }}>
            <div
                className="d-flex justify-content-center align-items-center bold-font mb-2">
                KARUSC
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