import { Stack } from "react-bootstrap";
import { useScreenSize } from "../../context/ScreenSizeContext";
import { DeviceTypes } from "../../models/DeviceTypes";

export type ReviewCardData = {
    imageURL: string,
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

export const ReviewCard = ({ imageURL, author, review }: ReviewCardData) => {
    const { getDeviceType } = useScreenSize();
    const deviceType = getDeviceType();

    const responsiveStyles: ResponsiveStyle = {
        marginTop: deviceType == DeviceTypes.MOBILE ? "30%"
            : deviceType == DeviceTypes.DESKTOP ? "17.5%"
            : "25%",
        marginBottom: deviceType == DeviceTypes.MOBILE ? "-30%"
            : deviceType == DeviceTypes.DESKTOP ? "-17.5%"
            : "-25%",
        paddingBottom: deviceType == DeviceTypes.MOBILE ? "30%"
            : deviceType == DeviceTypes.DESKTOP ? "17.5%"
            : "25%",
        radius: deviceType == DeviceTypes.MOBILE ? "60%"
            : deviceType == DeviceTypes.DESKTOP ? "35%"
            : "50%",
        x_margins: deviceType == DeviceTypes.MOBILE ? "20%"
            : deviceType == DeviceTypes.DESKTOP ? "32.5%"
            : "25%",
        transform: deviceType == DeviceTypes.MOBILE ? "translate(0%, -15%)"
            : deviceType == DeviceTypes.DESKTOP ? "translate(0%, -45%)"
            : "translate(0%, -15%)"
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
            src={imageURL}
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

