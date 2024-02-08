import { GoogleAuthComponent } from "../components/Authentication/GoogleAuthComponent";
import { ShopBy } from "../components/Home/ShopBy";
import { DefaultCarousel } from "../components/Home/DefaultCarousel"
import { Container } from "react-bootstrap";
import { Review } from "../components/Home/Review";
import { Category } from "../models/Category";
import { Collection } from "../models/Collection";
import { GetCategoriesEndpoint, GetCollectionsEndpoint } from "../utilities/EndpointUtils";
import axios from "axios";
import { useEffect, useState } from "react";
import { Loader } from "../components/Common/Loader";

export const Home = () => {

    const [categoryData, setCategoryData] = useState<Category[]>([]);
    const [collectionData, setCollectionData] = useState<Collection[]>([]);

    useEffect(() => {
        axios
            .get(GetCollectionsEndpoint(), { params: { pageSize: 100, pageNumber: 0 } })
            .then(response => {
                setCollectionData(response.data);
                console.log(categoryData.length);
            });

        axios
            .get(GetCategoriesEndpoint(), { params: { pageSize: 100, pageNumber: 0 } })
            .then(response => {
                setCategoryData(response.data);
            });
    }, []);


    return <>
            <Container className="d-flex justify-content-center align-items-center w-100">
                <GoogleAuthComponent />
            </Container>
            <DefaultCarousel />
            {categoryData.length > 0
                ? <ShopBy componentFor="Category" data={categoryData} />
                : <Loader />}
            {collectionData.length > 0
                ? <ShopBy componentFor="Collection" data={collectionData} />
                : <Loader />}           
            <Review />
        </>;
}