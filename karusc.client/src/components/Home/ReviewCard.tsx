import { Form, Stack } from "react-bootstrap";
import { useScreenSize } from "../../context/ScreenSizeContext";
import { DeviceTypes } from "../../models/DeviceTypes";
import { ReviewCardModel } from "../../models/ReviewModels";
import starEmpty from "../../../resources/media/star-empty.svg";
import starFilled from "../../../resources/media/star-filled.svg";

type ResponsiveStyle = {
    marginTop: string,
    marginBottom: string,
    paddingBottom: string,
    radius: string,
    x_margins: string,
    transform: string,
    starSize: string
}

export const ReviewCard = ({ author, title, rating, isInputCard }: ReviewCardModel) => {
    const { getDeviceType } = useScreenSize();
    const deviceType = getDeviceType();
    console.log(isInputCard); 

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
            : deviceType == DeviceTypes.DESKTOP ? "translate(0%, -35%)"
                : "translate(0%, -15%)",
        starSize: deviceType == DeviceTypes.MOBILE
            ? "15vh"
            : deviceType == DeviceTypes.DESKTOP
            ? "20vh"
            : "20vh"
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
            src={author.profilePictureUrl}
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
            {rating !== null && !isInputCard
                ? <div className="d-flex justify-content-center align-items-center mb-3">
                    <Stack direction="horizontal" gap={1}>
                        {Array
                            .from({ length: 5 })
                            .map((_, index) => index < rating
                                ? <img src={starFilled} height={responsiveStyles.starSize} />
                                : <img src={starEmpty} height={responsiveStyles.starSize} />)}
                    </Stack>
                </div>
                : null}
            
            <div className="d-flex justify-content-center align-items-center semi-bold-font mb-3">
                {isInputCard
                    ? <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Enter Review"
                        className="purple-placeholder" /> 
                    : <i>"{title}"</i>}
            </div>
            <div className="ms-auto regular-font">
                - {author.name}
            </div>
        </Stack>
    </div>
}

