using MediatR;

namespace Karusc.Server.Application.Products.Search
{
    public record GetProductsSearchQuery(
        int PageSize,
        string ProductName) : IRequest<List<ProductDto>>;
}
