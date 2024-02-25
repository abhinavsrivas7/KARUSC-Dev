import { User } from "./UserModels";

export type Review = {
    id: string,
    author: User,
    title: string,
    rating: number
}