import axios from "axios";
import { useEffect, useState } from "react";
import { Product, ProductListFilter } from "../models/ProductModels";
import { Loader } from "../components/Common/Loader";
import { NoData } from "../components/Common/NoData";
import { Button, Col, Container, Dropdown, Row, Stack } from "react-bootstrap";
import { ProductCard } from "../components/Products/ProductCard";
import { GetProductsEndpoint } from "../utilities/EndpointUtils";
import { useScreenSize } from "../context/ScreenSizeContext";
import { DeviceTypes } from "../models/DeviceTypes";
import { NavLink, useLocation } from "react-router-dom";
import { Pagination } from "../components/Common/Pagination";
import { FilterSlider } from "../components/Products/FilterSlider";

export const ProductList = () => {
    const { getDeviceType } = useScreenSize();
    const deviceType = getDeviceType();
    const [products, setProducts] = useState<Product[]>([]);
    const [errorState, setErrorState] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [totalProducts, setTotalProducts] = useState<number>(0);
    const [showFilterSlider, setShowFilterSlider] = useState<boolean>(false);
    const gapVal = getDeviceType() == DeviceTypes.DESKTOP ? 0 : 1;
    const gapClass = getDeviceType() == DeviceTypes.DESKTOP ? "my -2 px-3" : "my-2 px-1";
    const location = useLocation();
    const pageSize = deviceType === DeviceTypes.MOBILE ? 10 : 12;
    
    useEffect(() => {
        const getProductsFilter = () => {
            const state = location.state as ProductListFilter;

            const defaultParams = {
                pageSize: pageSize,
                pageNumber: currentPage
            };

            if (state && state.name) {
                let params;

                switch (state.name) {
                    case 'Category': params = {
                        pageSize: pageSize,
                        pageNumber: currentPage,
                        categories: state.id
                    };
                    break;

                    case 'Collection': params = {
                        pageSize: pageSize,
                        pageNumber: currentPage,
                        collections: state.id
                    };
                    break;

                    default: params = defaultParams;
                }

                return params;
            }

            return defaultParams;
        };

        axios.get(GetProductsEndpoint(), {
            params: getProductsFilter()
        }).then(response => {
            setProducts(response.data.products)
            setTotalProducts(response.data.count);
        }).catch(() => setErrorState(true));
    }, [currentPage, pageSize, deviceType, location.state]);
    
    return products
        ? <>
            <Container className="d-flex justify-content-center align-items-center">
                <h1 className="bold-font light-pink">KARUSC</h1>
            </Container>
            <Stack direction="horizontal" className="mt-4 px-0" style={{ width: '100%' }}>
                <div
                    style={{ width: '40%' }}
                    className="d-flex justify-content-center align-items-center">
                    <Button
                        variant="white"
                        className="light-pink bold-font"
                        onClick={() => setShowFilterSlider(true)}>
                        Filter
                    </Button>
                </div>
                <div
                    style={{ width: '20%' }}
                    className="d-flex justify-content-center align-items-center">
                    <span className="">
                        {pageSize > totalProducts
                            ? totalProducts
                            : pageSize * (currentPage + 1)}
                        /
                        {totalProducts}
                    </span>
                </div>
                <div
                    style={{ width: '40%'}}
                    className="d-flex justify-content-center align-items-center">
                    <Dropdown align="end">
                        <Dropdown.Toggle 
                            variant="white"
                            className="light-pink bold-font">
                            Sort
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="light-pink">
                            <Dropdown.Item className="light-pink">
                                Popularity
                            </Dropdown.Item>
                            <Dropdown.Item className="light-pink">
                                Recently Added
                            </Dropdown.Item>
                            <Dropdown.Item className="light-pink">
                                Price: Low To High
                            </Dropdown.Item>
                            <Dropdown.Item className="light-pink">
                                Price: High To Low
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>  
            </Stack>           
            <Container className="mt-4">
                <Row md={4} xs={2} lg={4} gap={gapVal}>
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

            <Container className="mt-3 px-4 d-flex justify-content-center">
                <Pagination
                    currentPage={currentPage}
                    totalCount={totalProducts <= pageSize 
                        ? 0
                        : totalProducts % pageSize > 0
                        ? totalProducts / pageSize
                        : (totalProducts / pageSize) - 1}
                    onPageChange={(newPage) => setCurrentPage(newPage)}
                />
            </Container>
            <FilterSlider show={showFilterSlider} onClose={() => setShowFilterSlider(false)} />
          </>
        : errorState
        ? <NoData />
        : <Loader />;
}