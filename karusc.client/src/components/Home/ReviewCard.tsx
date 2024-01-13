import { Stack } from "react-bootstrap";
import authorImg from "../../../resources/media/user-profile-photo.jpg";
import { useScreenSize } from "../../context/ScreenSizeContext";

export type ReviewCardData = {
    //imageURL: string,
    author: string,
    review: string
}

type ResponsiveStyle = {
    marginTop: string,
    marginBottom: string,
    paddingBottom: string,
    radius: string,
    x_margins: string,
    transform: string
}

export const ReviewCard = ({ author, review }: ReviewCardData) => {
    const { checkIfMobile } = useScreenSize();
    const responsiveStyles: ResponsiveStyle = {
        marginTop: checkIfMobile() ? "30%" : "17.5%",
        marginBottom: checkIfMobile() ? "-30%" : "-17.5%",
        paddingBottom: checkIfMobile() ? "30%" : "17.5%",
        radius: checkIfMobile() ? "60%" : "35%",
        x_margins: checkIfMobile() ? "20%" : "32.5%",
        transform: checkIfMobile() ? "translate(0%, -15%)" : "translate(0%, -45%)"
    }

    return <div className="purple"
        style={{
            margin: 0,
            padding: 0,
            marginTop: responsiveStyles.marginTop,
            marginBottom: responsiveStyles.marginBottom,
            paddingBottom: responsiveStyles.paddingBottom,
            width: '100%'
        }}>
        <img
            src={authorImg}
            height={responsiveStyles.radius}
            width={responsiveStyles.radius}
            style={{
                marginRight: responsiveStyles.x_margins,
                marginLeft: responsiveStyles.x_margins,
                borderRadius: '50%',
                marginBottom: 0,
                transform: 'translate(0%, -50%)'
            }} />
        <Stack
            style={{ transform: responsiveStyles.transform }}
            className="px-3">
            <div className="d-flex justify-content-center align-items-center semi-bold-font mb-2">
                <i>""{review}""</i>
            </div>
            <div className="ms-auto regular-font">
                - {author}
            </div>
        </Stack>
    </div>
}

