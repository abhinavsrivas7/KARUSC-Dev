const baseUrl = import.meta.env.VITE_REACT_APP_API_BASE_URL;

export const GetProductsEndpoint = () => baseUrl + 'product';
export const GetCategoriesEndpoint = () => baseUrl + 'category';
export const GetCollectionsEndpoint = () => baseUrl + 'collection';