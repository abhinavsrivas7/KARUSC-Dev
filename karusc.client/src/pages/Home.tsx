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

export const Home = () => {

    const [categoryData, setCategoryData] = useState<Category[]>([]);
    const [collectionData, setCollectionData] = useState<Collection[]>([]);

    useEffect(() => {
        axios.get(GetCollectionsEndpoint(), {
            params: {
                pageSize: 8,
                pageNumber: 0
            }
        })
            .then(response => {
                console.log(response);
                setCollectionData(response.data)
            })
            .catch((error) => {
                console.error("Error fetching collection data:", error);
            });
    }, []);

    useEffect(() => {
        axios.get(GetCategoriesEndpoint(), {
            params: {
                pageSize: 8,
                pageNumber: 0
            }
        })
            .then(response => {
                console.log(response);
                setCategoryData(response.data)
            })
            .catch((error) => {
                console.error("Error fetching category data:", error);
            });
    }, []);

    return <>
        <Container className="d-flex justify-content-center align-items-center w-100">
            <GoogleAuthComponent />
        </Container>
        <DefaultCarousel></DefaultCarousel>
        <ShopBy componentFor="Category" data={categoryData}></ShopBy>
        <ShopBy componentFor="Collection" data={collectionData}></ShopBy>
        <Review></Review>
    </>
}