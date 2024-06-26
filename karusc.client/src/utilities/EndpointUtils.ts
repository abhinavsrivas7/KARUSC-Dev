const baseUrl = import.meta.env.VITE_REACT_APP_API_BASE_URL;

export const GetProductsEndpoint = () => baseUrl + 'product' + '/get';
export const GetProductByIdEndpoint = () => baseUrl + 'product';
export const GetCategoriesEndpoint = () => baseUrl + 'category';
export const GetCollectionsEndpoint = () => baseUrl + 'collection';
export const GetHomeCarouselImageEndpoint = () => baseUrl + 'homecarouselimage';
export const GetLoginEndpoint = () => baseUrl + 'user/login'; 
export const GetSignupEndpoint = () => baseUrl + 'user/signup'; 
export const GetCreateAdminUserEndpoint = () => baseUrl + 'user/createAdminUser'; 
export const GetReviewEndpoint = () => baseUrl + 'review'; 
export const GetSearchEndpoint = () => baseUrl + 'search';
export const CartEndpoint = () => baseUrl + 'cart';
export const AddToCartEndpoint = () => baseUrl + 'cart/AddToCart';
export const AddLineItemsEndpoint = () => baseUrl + 'cart/AddLineItems';
export const GetAllAddressesEndpoint = () => baseUrl + 'address/GetAll';
export const GetAddressByIdEndpoint = () => baseUrl + 'address/GetById';
export const AddressEndpoint = () => baseUrl + 'address';