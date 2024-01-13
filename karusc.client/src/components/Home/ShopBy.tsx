import { Col, Container, Row } from "react-bootstrap";
import { ShopByCard, ShopByCardData } from "./ShopByCard";
import { NavLink } from "react-router-dom";
import { useScreenSize } from "../../context/ScreenSizeContext";
import { DeviceTypes } from "../../models/DeviceTypes";

interface ShopByComponentData {
    componentFor: string
}

const cardsData: ShopByCardData[] = [
    { title: "Earrings", imageURL: "https://cdn.animaapp.com/projects/659d059feadbbdac90703589/releases/659d06005889918d80e6a242/img/rectangle-1.png" },
    { title: "Earrings", imageURL: "https://cdn.animaapp.com/projects/659d059feadbbdac90703589/releases/659d06005889918d80e6a242/img/rectangle-1.png" },
    { title: "Earrings", imageURL: "https://cdn.animaapp.com/projects/659d059feadbbdac90703589/releases/659d06005889918d80e6a242/img/rectangle-1.png" },
    { title: "Earrings", imageURL: "https://cdn.animaapp.com/projects/659d059feadbbdac90703589/releases/659d06005889918d80e6a242/img/rectangle-1.png" },
    { title: "Earrings", imageURL: "https://cdn.animaapp.com/projects/659d059feadbbdac90703589/releases/659d06005889918d80e6a242/img/rectangle-1.png" },
    { title: "Earrings", imageURL: "https://cdn.animaapp.com/projects/659d059feadbbdac90703589/releases/659d06005889918d80e6a242/img/rectangle-1.png" },
    { title: "Earrings", imageURL: "https://cdn.animaapp.com/projects/659d059feadbbdac90703589/releases/659d06005889918d80e6a242/img/rectangle-1.png" },
    { title: "Earrings", imageURL: "https://cdn.animaapp.com/projects/659d059feadbbdac90703589/releases/659d06005889918d80e6a242/img/rectangle-1.png" },
];

export const ShopBy = ({ componentFor }: ShopByComponentData) => {
    const { getDeviceType } = useScreenSize();
    return <>
        <Container className="mt-4">
            <Container className="d-flex justify-content-center align-items-center mb-4 semi-bold-font">
                <h2 >Shop By {componentFor}</h2>
            </Container>      
            <Row md={4} xs={3} lg={4} className="g-2">
                {cardsData.slice(getDeviceType() == DeviceTypes.MOBILE ? 2 : 0).map(card => <Col
                    className="d-flex justify-content-center align-items-center">
                    <NavLink style={{ textDecoration: 'none' }} to = "/shop">
                        <ShopByCard imageURL={card.imageURL} title={card.title} />
                    </NavLink>
                </Col>)}
            </Row>
        </Container>
    </>;
}