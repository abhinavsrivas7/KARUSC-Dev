import { Carousel } from "react-bootstrap";

type CarouselData = { images: string[] };

export const ProductCarousel = ({ images }: CarouselData) => {
    console.log(images);
    return (
        <Carousel controls={true} indicators={true} draggable={true} interval={null}>
            {images.map((image) => (
                <Carousel.Item>
                    <img
                        height="auto"
                        width="100%"
                        className="object-cover w-full"
                        src={image}
                    />
                </Carousel.Item>
            ))}
        </Carousel>
    );
};
