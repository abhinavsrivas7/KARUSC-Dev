import { Container, Tab, Tabs } from "react-bootstrap"
import { ProductOperations } from "../components/Admin/Products/ProductOperations"
import { CategoryOperations } from "../components/Admin/Categories/CategoryOperations"
import { CollectionOperations } from "../components/Admin/Collections/CollectionOperations"
import { HomeCarouselOperations } from "../components/Admin/HomeCarousel/HomeCarouselOperations"
import { UserOperations } from "../components/Admin/Users/UserOperations"

export const Admin = () => {
    return <Container className="p-4 light-pink" style={{ minHeight: '80vh' }}>
        <Container className="mb-5 d-flex justify-content-center align-items-center">
            <h2>Welcome Administrator</h2>
        </Container>
        <Tabs defaultActiveKey="products" id="admin" fill>
            <Tab eventKey="products" title="Products">
                <ProductOperations />
            </Tab>
            <Tab eventKey="categories" title="Categories">
                <CategoryOperations />
            </Tab>
            <Tab eventKey="collections" title="Collections">
                <CollectionOperations />
            </Tab>
            <Tab eventKey="homeCarousel" title="Home Carousel">
                <HomeCarouselOperations />
            </Tab>
            <Tab eventKey="users" title="Users">
                <UserOperations />
            </Tab>
        </Tabs>
    </Container>;   
}

