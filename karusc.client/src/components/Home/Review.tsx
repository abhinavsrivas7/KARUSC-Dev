import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { ReviewCard, ReviewCardData } from './ReviewCard';


const reviews: ReviewCardData[] = [
    { author: "Henry", review: "Bruce Wayne is a dead man walking!!" },
    { author: "Henry", review: "Bruce Wayne is a dead man walking!!" },
    { author: "Henry", review: "Bruce Wayne is a dead man walking!!" },
    { author: "Henry", review: "Bruce Wayne is a dead man walking!!" },
    { author: "Henry", review: "Bruce Wayne is a dead man walking!!" },
    { author: "Henry", review: "Bruce Wayne is a dead man walking!!" },
    { author: "Henry", review: "Bruce Wayne is a dead man walking!!" }
];

const responsive = {
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3.5 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 3.5 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 2.5 }
};

export const Review = () => {
    return <div className="px-4 py-5">
        <div className="d-flex justify-content-center align-items-center mb-4 semi-bold-font">
            <h2>Customer Reviews</h2>
        </div>
        <Carousel
            swipeable={true}
            draggable={true}
            showDots={false}
            responsive={responsive}
            ssr={false} // means to render carousel on server-side.
            infinite={false}
            autoPlay={false}
            keyBoardControl={true}
            removeArrowOnDeviceType={["mobile"]}
            customTransition="all .5"
            transitionDuration={500}
        >
            {reviews.map((review) => <div className="px-3">
                <ReviewCard author={review.author} review={review.review}></ReviewCard>            
            </div>)}
        </Carousel>
    </div>;
}
