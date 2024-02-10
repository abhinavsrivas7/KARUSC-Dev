import { Carousel } from "react-bootstrap";

type CarouselData = { images: string[] };

export const ProductCarousel = ({ images }: CarouselData) => {
    console.log(images);
    return (
        <Carousel controls={true} indicators={true} draggable={true} interval={null}>
            {images.map((image, index) => (
                <Carousel.Item key={index} className="d-flex align-items-center justify-content-center">
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
