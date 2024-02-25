import { ShopBy } from "../components/Home/ShopBy";
import { Review } from "../components/Home/Review";
import { Category } from "../models/CategoryModels";
import { Collection } from "../models/CollectionModels";
import { GetCategoriesEndpoint, GetCollectionsEndpoint, GetHomeCarouselImageEndpoint } from "../utilities/EndpointUtils";
import axios from "axios";
import { useEffect, useState } from "react";
import { Loader } from "../components/Common/Loader";
import { ImageCarousel } from "../components/Common/ImageCarousel";

export const Home = () => {
    
    const [categoryData, setCategoryData] = useState<Category[]>([]);
    const [collectionData, setCollectionData] = useState<Collection[]>([]);
    const [carouselData, setCarouselData] = useState<string[]>([]);
    //const [reviewData, setReviewData] = useState<>([]);

    useEffect(() => {
        axios
            .get(GetCollectionsEndpoint(), { params: { pageSize: 100, pageNumber: 0 } })
            .then(response => {
                setCollectionData(response.data);   
            });

        axios
            .get(GetCategoriesEndpoint(), { params: { pageSize: 100, pageNumber: 0 } })
            .then(response => {
                setCategoryData(response.data);
            }); 

        axios
            .get(GetHomeCarouselImageEndpoint(), { params: { pageSize: 100, pageNumber: 0 } })
            .then(response => {
                const imageUrls = response.data.map((item: { image: string; }) => item.image);
                setCarouselData(imageUrls);
            });
    }, []);

    return <>
        <ImageCarousel
            images={carouselData}
            setControls={false}
            showIndicators={false}
            intervalValue={1000}
            isDraggable={true} />
        {categoryData.length > 0
            ? <ShopBy componentFor="Category" data={categoryData} />
            : <Loader />}
        {collectionData.length > 0
            ? <ShopBy componentFor="Collection" data={collectionData} />
            : <Loader />}           
        <Review />
        </>;
}