import { GoogleAuthComponent } from "../components/Authentication/GoogleAuthComponent";
import { ShopBy } from "../components/Home/ShopBy";
import { DefaultCarousel } from "../components/Home/DefaultCarousel"
import { Container } from "react-bootstrap";
import { Review } from "../components/Home/Review";

export const Home = () => {
    return <>
        <Container className="d-flex justify-content-center align-items-center w-100">
            <GoogleAuthComponent />
        </Container>
        <DefaultCarousel></DefaultCarousel>
        <ShopBy componentFor="Category"></ShopBy>
        <ShopBy componentFor="Collections"></ShopBy>
        <Review></Review>
    </>
}