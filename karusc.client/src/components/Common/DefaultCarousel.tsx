import { Carousel } from "react-bootstrap";

type CarouselData = {
    images: string[],
    setControls: boolean,
    showIndicators: boolean,
    intervalValue: number | null,
    isDraggable: boolean
};

export const DefaultCarousel = (carouselData : CarouselData) => {
    return (
        <Carousel controls={carouselData.setControls}
            indicators={carouselData.showIndicators}
            draggable={carouselData.isDraggable}
            interval={carouselData.intervalValue}>
            {
                carouselData.images.map((image, index) => (
                <Carousel.Item key={index}>
                    <img
                        width="100%"
                        height="auto"
                        className="object-cover w-full"
                        src={image}
                    />
                </Carousel.Item>
            ))}
        </Carousel>
    );
};
