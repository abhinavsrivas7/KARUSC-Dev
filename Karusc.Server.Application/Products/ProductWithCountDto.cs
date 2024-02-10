namespace Karusc.Server.Application.Products
{
    internal record ProductWithCountDto(
        List<ProductDto> Products, 
        int Count);
}
