import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { ReviewCard } from './ReviewCard';
import { Review as ReviewModel } from '../../models/ReviewModels';
//import authorImg from "../../../resources/media/user-profile-photo.jpg";
import addImg from "../../../resources/media/circle-add.svg";
import { Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { GetReviewEndpoint } from '../../utilities/EndpointUtils';
import axios from 'axios';

const responsive = {
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3.5, slidesToSlide: 4 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 3.5, slidesToSlide: 2 },
    mobile: { breakpoint: { max: 464, min: 350 }, items: 2.5, slidesToSlide: 4 },
    narrowMobile: { breakpoint: { max: 350, min: 0 }, items: 1.5, slidesToSlide: 4 }
};

export const Review = () => {
    const [reviews, setReviews] = useState<ReviewModel[] | null>(null);
    const [showReviewsSection, setShowReviewsSection] = useState<boolean>(true);

    useEffect(() => {
        axios
            .get(GetReviewEndpoint())
            .then(response => setReviews(response.data))
            .catch(() => setShowReviewsSection(false));
    }, []);
    console.log(reviews);
    return <>
        {showReviewsSection && reviews !== null
            ? <div className="px-4 py-5">
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
                        <ReviewCard
                            imageURL={review.author.profilePictureUrl}
                            author={review.author.name}
                            review={review.title} />
                    </div>)}
                </Carousel>
                <div className="mt-4 d-flex justify-content-center align-items-center">
                    <Button variant="white">
                        <img src={addImg} />
                        <span className="regular-font ms-1 purple-text">Add Review</span>
                    </Button>
                </div>
            </div>
            : null}
    </>;
}
