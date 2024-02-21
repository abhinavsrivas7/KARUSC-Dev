import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { ReviewCard, ReviewCardData } from './ReviewCard';
import authorImg from "../../../resources/media/user-profile-photo.jpg";
import addImg from "../../../resources/media/circle-add.svg";
import { Button } from 'react-bootstrap';

const reviews: ReviewCardData[] = [
    { imageURL: authorImg, author: "Henry", review: "Great!! Bruce Wayne is a dead man walking!!1" },
    { imageURL: authorImg, author: "Henry", review: "Great!! Bruce Wayne is a dead man walking!!2" },
    { imageURL: authorImg, author: "Henry", review: "Great!! Bruce Wayne is a dead man walking!!3" },
    { imageURL: authorImg, author: "Henry", review: "Great!! Bruce Wayne is a dead man walking!!4" },
    { imageURL: authorImg, author: "Henry", review: "Great!! Bruce Wayne is a dead man walking!!5" },
    { imageURL: authorImg, author: "Henry", review: "Great!! Bruce Wayne is a dead man walking!!6" },
    { imageURL: authorImg, author: "Henry", review: "Great!! Bruce Wayne is a dead man walking!!7" }
];

const responsive = {
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3.5, slidesToSlide: 4 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 3.5, slidesToSlide: 2 },
    mobile: { breakpoint: { max: 464, min: 350 }, items: 2.5, slidesToSlide: 4 },
    narrowMobile: { breakpoint: { max: 350, min: 0 }, items: 1.5, slidesToSlide: 4 }
};

export const Review = () => {
    return <div className="px-4 py-5">
        <div className="d-flex justify-content-center align-items-center mb-4 semi-bold-font">
            <h2>Customer Reviews</h2>
        </div>
        <Carousel
            swipeable={true}
            draggable={false}
            showDots={false}
            responsive={responsive}
            ssr={false} // means to render carousel on server-side.
            infinite={false}
            autoPlay={false}
            keyBoardControl={true}
            removeArrowOnDeviceType={["mobile", "narrowMobile"]}
            minimumTouchDrag={1}
            
        >
            {reviews.map((review) => <div className="px-2">
                <ReviewCard imageURL={review.imageURL} author={review.author} review={review.review} />            
            </div>)}
        </Carousel>
        <div className="mt-4 d-flex justify-content-center align-items-center">
            <Button variant="white">
                <img src={addImg} />
                <span className="regular-font ms-1 purple-text">Add Review</span>
            </Button>
        </div>
    </div>;
}
