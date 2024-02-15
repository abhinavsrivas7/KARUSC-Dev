import { GoogleAuthComponent } from "../components/Authentication/GoogleAuthComponent";
import { ShopBy } from "../components/Home/ShopBy";
import { Container } from "react-bootstrap";
import { Review } from "../components/Home/Review";
import { Category } from "../models/Category";
import { Collection } from "../models/Collection";
import { GetCategoriesEndpoint, GetCollectionsEndpoint, GetHomeCarouselImageEndpoint } from "../utilities/EndpointUtils";
import axios from "axios";
import { useEffect, useState } from "react";
import { Loader } from "../components/Common/Loader";
import { DefaultCarousel } from "../components/Common/DefaultCarousel";

export const Home = () => {

    const [categoryData, setCategoryData] = useState<Category[]>([]);
    const [collectionData, setCollectionData] = useState<Collection[]>([]);
    const [carouselData, setCarouselData] = useState<string[]>([]);

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
    }, []);

    useEffect(() => {
        axios
            .get(GetHomeCarouselImageEndpoint(), { params: { pageSize: 100, pageNumber: 0 } })
            .then(response => {
                const imageUrls = response.data.map((item: { image: string; }) => item.image);
                console.log("Carousel Data");
                console.log(imageUrls);
                setCarouselData(imageUrls);
                console.log(carouselData);
            });
    }, []);


    return <>
            <Container className="d-flex justify-content-center align-items-center w-100">
                <GoogleAuthComponent />
        </Container>
        <DefaultCarousel
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