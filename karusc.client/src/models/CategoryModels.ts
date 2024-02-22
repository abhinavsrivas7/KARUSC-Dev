export type Category = {
    id: string
    name: string
    imageURL: string
};

export type CreateCategoryCommand = {
    name: string,
    image: string
}