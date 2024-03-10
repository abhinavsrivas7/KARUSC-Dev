import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { ReviewCard } from './ReviewCard';
import { ReviewCardModel, Review as ReviewModel } from '../../models/ReviewModels';
import addImg from "../../../resources/media/circle-add.svg";
import { Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { GetReviewEndpoint } from '../../utilities/EndpointUtils';
import axios from 'axios';
import { useUserContext } from '../../hooks/useUserHook';

const responsive = {
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3.5, slidesToSlide: 4 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 2.5, slidesToSlide: 2 },
    mobile: { breakpoint: { max: 464, min: 350 }, items: 1.5, slidesToSlide: 4 },
    narrowMobile: { breakpoint: { max: 350, min: 0 }, items: 1.5, slidesToSlide: 4 }
};

export const Review = () => {
    const [reviews, setReviews] = useState<ReviewCardModel[] | null>(null);
    const [showReviewsSection, setShowReviewsSection] = useState<boolean>(true);
    const { getUser } = useUserContext();
    const user = getUser();

    useEffect(() => {
        axios
            .get(GetReviewEndpoint())
            .then(response => setReviews(response.data.map((review: ReviewModel) => {
                const reviewCard: ReviewCardModel = {
                    id: review.id,
                    author: review.author,
                    isInputCard: false,
                    rating: review.rating,
                    title: review.title,
                    cancelAddCallback: removeAddReviewCard,
                    addReviewCallback: addReviewCard
                };

                return reviewCard;
            })))
            .catch(() => setShowReviewsSection(false));
    }, []);

    const handleAddReview = () => {
        if (user === null) throw new Error("User must be logged in");

        const addReview: ReviewCardModel = {
            id: "create-card",
            author: user,
            isInputCard: true,
            rating: null,
            title: null,
            cancelAddCallback: removeAddReviewCard,
            addReviewCallback: addReviewCard
        };

        setReviews(reviews !== null ? [addReview, ...reviews] : [addReview]);
    };

    const removeAddReviewCard = () => {
        if (user === null) throw new Error("User must be logged in");

        if (reviews !== null) {
            setReviews(reviews.filter(review => review.id !== "create-card"));
        }
    };

    const addReviewCard = (addedReview: ReviewModel) => {
        const addedReviewCard: ReviewCardModel = {
            author: addedReview.author,
            id: addedReview.id,
            rating: addedReview.rating,
            isInputCard: false,
            title: addedReview.title,
            addReviewCallback: addReviewCard,
            cancelAddCallback: removeAddReviewCard
        };
        setReviews(reviews !== null
            ? [addedReviewCard, ...reviews.filter(review => review.id !== "create-card")]
            : [addedReviewCard]);
    };
    
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
                    {reviews.map((review) => <div key={review.id} className="px-2">
                        <ReviewCard
                            author={review.author}
                            isInputCard={review.isInputCard}
                            rating={review.rating}
                            title={review.title}
                            id={review.id}
                            cancelAddCallback={removeAddReviewCard}
                            addReviewCallback={addReviewCard} />
                    </div>)}
                </Carousel>
                <div className="mt-4 d-flex justify-content-center align-items-center">
                    <Button variant="white" onClick={handleAddReview}>
                        <img src={addImg} />
                        <span className="regular-font ms-1 purple-text">Add Review</span>
                    </Button>
                </div>
            </div>
            : null}
    </>;
}
