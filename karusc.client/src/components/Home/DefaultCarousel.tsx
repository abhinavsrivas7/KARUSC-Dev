import { Carousel } from "react-bootstrap";
import carousel from "../../../resources/media/carousel.svg";
export const DefaultCarousel = () => {
    return (
        <Carousel controls={false} indicators={false} interval={1000}>
            <Carousel.Item>
                <img
                    className="object-cover w-full"
                    src={carousel}
                    alt="First slide"
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="object-cover w-full"
                    src={carousel}
                    alt="Second slide"
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="object-cover w-full"
                    src={carousel}
                    alt="Third slide"
                />
            </Carousel.Item>
        </Carousel>
    );
};
