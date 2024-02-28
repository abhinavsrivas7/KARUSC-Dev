import { Button, Form, Stack } from "react-bootstrap";
import { useScreenSize } from "../../context/ScreenSizeContext";
import { DeviceTypes } from "../../models/DeviceTypes";
import { CreateReviewCommand, ReviewCardModel } from "../../models/ReviewModels";
import starEmpty from "../../../resources/media/star-empty.svg";
import starFilled from "../../../resources/media/star-filled.svg";
import check from "../../../resources/media/check.svg";
import cross from "../../../resources/media/cross.svg";
import { useState } from "react";
import { useUserContext } from "../../hooks/useUserHook";
import axios from "axios";
import { GetReviewEndpoint } from "../../utilities/EndpointUtils";

type ResponsiveStyle = {
    marginTop: string,
    marginBottom: string,
    paddingBottom: string,
    radius: string,
    x_margins: string,
    transform: string,
    starSize: string,
    ratingInputClass: string
}

export const ReviewCard = ({
    author,
    title,
    rating,
    isInputCard,
    cancelAddCallback,
    addReviewCallback }: ReviewCardModel) => {
    const { getDeviceType } = useScreenSize();
    const { getToken } = useUserContext();
    const tokens = getToken();

    const deviceType = getDeviceType();

    const [createReviewCommand, setCreateReviewCommand] = useState<CreateReviewCommand>({
        rating: 5,
        title: ""
    });

    const addReviewTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCreateReviewCommand({
            rating: createReviewCommand.rating,
            title: event.target.value
        });
    };

    const handleCreateReview = () => {
        if (tokens === null || tokens.length !== 2)
            throw new Error("Must be logged in");

        console.log(tokens.find(token => token.tokenType === "AccessToken")?.tokenValue);
        console.log(createReviewCommand);

        axios.post(
            GetReviewEndpoint(),
            createReviewCommand,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization':
                        `Bearer ${tokens.find(token => token.tokenType === "AccessToken")?.tokenValue}`
                }
            }
        ).then(response => { console.log(response.data); addReviewCallback(response.data); });
    };

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
            : "20vh",
        ratingInputClass: deviceType == DeviceTypes.MOBILE
            ? "mt-3"
            : deviceType == DeviceTypes.DESKTOP
            ? "mt-5 pt-5"
            : "mt-3"
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
            <div className="d-flex justify-content-center align-items-center mb-3">
                <Stack direction="horizontal" gap={1}>
                    {rating !== null && !isInputCard
                        ? Array 
                            .from({ length: 5 })
                            .map((_, index) => index < rating
                                ? <img src={starFilled} height={responsiveStyles.starSize} />
                                : <img src={starEmpty} height={responsiveStyles.starSize} />)
                        : Array
                            .from({ length: 5 })
                            .map((_, index) => index < createReviewCommand.rating
                                ? <div className={responsiveStyles.ratingInputClass} >
                                    <img
                                        src={starFilled}
                                        height={responsiveStyles.starSize}
                                        onClick={() => setCreateReviewCommand({
                                            title: createReviewCommand.title,
                                            rating: index + 1
                                        })} />
                                </div>
                                : <div className={responsiveStyles.ratingInputClass}>
                                    <img
                                        src={starEmpty}
                                        height={responsiveStyles.starSize}
                                        onClick={() => setCreateReviewCommand({
                                            title: createReviewCommand.title,
                                            rating: index + 1
                                        })} />
                                </div>)}
                </Stack>
            </div>           
            <div className="my-3">
                {isInputCard
                    ? <div className="px-2">
                        <Form.Control
                            as="textarea"
                            rows={5}
                            placeholder="Enter Review"
                            className="purple-placeholder"
                            style={{ border: "4px dotted white" }}
                            onChange={addReviewTitle} />
                        <div className="d-flex justify-content-end align-items-end">
                            <Button
                                className="admin-button pe-0"
                                style={{ opacity: 0.85 }}
                                onClick={cancelAddCallback}>
                                Cancel
                                <img height={responsiveStyles.starSize} src={cross} />
                            </Button>
                            <Button
                                className="admin-button pe-0"
                                onClick={handleCreateReview}>
                                Add
                                <img height={responsiveStyles.starSize} src={check} />
                            </Button>
                        </div>
                    </div>
                    : <i className="d-flex justify-content-center align-items-center semi-bold-font">
                        "{title}"
                    </i>}
            </div>
            <div className="ms-auto regular-font">
                - {author.name}
            </div>
        </Stack>
    </div>
}

