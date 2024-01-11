import { Carousel } from "react-bootstrap";
import img1 from "../../../resources/media/carousel1.jpg";
import img2 from "../../../resources/media/carousel2.jpg";
import img3 from "../../../resources/media/carousel3.jpg";

export const DefaultCarousel = () => {
    return (
        <Carousel controls={false} indicators={false} interval={1000}>
            <Carousel.Item>
                <img
                    height="auto"
                    width="100%"
                    className="object-cover w-full"
                    src={img1}
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                    height="auto"
                    width="100%"
                    className="object-cover w-full"
                    src={img2}
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                    height="auto"
                    width="100%"
                    className="object-cover w-full"
                    src={img3}
                />
            </Carousel.Item>
        </Carousel>
    );
};
