import { User } from "./UserModels";

export type Review = {
    id: string,
    author: User,
    title: string,
    rating: number
}

export type ReviewCardModel = {
    id: string,
    author: User,
    title: string | null,
    rating: number | null,
    isInputCard: boolean,
    cancelAddCallback: () => void,
    addReviewCallback: (review: Review) => void
};

export type CreateReviewCommand = {
    rating: number,
    title: string
};