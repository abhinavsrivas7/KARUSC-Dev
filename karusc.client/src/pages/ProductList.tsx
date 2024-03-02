import axios from "axios";
import { useEffect, useState } from "react";
import { Product, ProductListFilter } from "../models/ProductModels";
import { Loader } from "../components/Common/Loader";
import { NoData } from "../components/Common/NoData";
import { Col, Container, Row } from "react-bootstrap";
import { ProductCard } from "../components/Products/ProductCard";
import { GetProductsEndpoint } from "../utilities/EndpointUtils";
import { useScreenSize } from "../context/ScreenSizeContext";
import { DeviceTypes } from "../models/DeviceTypes";
import { NavLink, useLocation } from "react-router-dom";
import { Pagination } from "../components/Common/Pagination";

export const ProductList = () => {
    const { getDeviceType } = useScreenSize();
    const deviceType = getDeviceType();
    const [products, setProducts] = useState<Product[]>([]);
    const [errorState, setErrorState] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(1);    
    const gapVal = getDeviceType() == DeviceTypes.DESKTOP ? 0 : 1;
    const gapClass = getDeviceType() == DeviceTypes.DESKTOP ? "my -2 px-3" : "my-2 px-1";

    const location = useLocation();
    const state = location.state as ProductListFilter;
    console.log("got state");
    console.log(state.id);
    console.log(state.name);
    
    useEffect(() => {
        axios.get(GetProductsEndpoint(), {
            params: {
                pageSize: deviceType === DeviceTypes.MOBILE ? 9 : 12,
                pageNumber: currentPage,
                //categories: categoryId === '' ? null : categoryId,
                //collections: collectionId === '' ? null : collectionId
            }
        }).then(response => {
            setProducts(response.data.products)
            setTotalPages(response.data.count);

        }).catch(() => setErrorState(true));
    }, [currentPage, deviceType]);
    
    return products
        ? <>
            <Container className="d-flex justify-content-center align-items-center">
                <h1 className="bold-font light-pink">KARUSC</h1>
            </Container>
            <hr style={{color: "white"}}/>
            <Container className="mt-4">
                <Row md={4} xs={3} lg={4} gap={gapVal}>
                    {products.map((item) => (
                        <Col key={item.id} className={gapClass}>
                            <NavLink
                                style={{ textDecoration: 'none', width: '100%' }}
                                to={"/ProductDetails?id=" + item.id}>
                                <ProductCard
                                    images={item.images}
                                    title={item.title}
                                    price={item.price}
                                    id={item.id}
                                    description={item.description}
                                    careInstructions={item.careInstructions}
                                    category={item.category}
                                    collection={item.collection} />
                            </NavLink>
                        </Col>
                    ))}
                </Row>
            </Container>

            <Container className="mt-3 d-flex justify-content-center">
                <Pagination
                    currentPage={currentPage}
                    totalCount={totalPages / (deviceType === DeviceTypes.MOBILE ? 9 : 12)}
                    onPageChange={(newPage) => setCurrentPage(newPage)}
                />
            </Container>
          </>
        : errorState
        ? <NoData />
        : <Loader />;
}