export type Collection = {
    id: string
    name: string
    imageURL: string
};

export type CreateCollectionCommand = {
    name: string,
    image: string
}