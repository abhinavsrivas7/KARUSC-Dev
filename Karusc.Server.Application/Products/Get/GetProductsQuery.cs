using MediatR;

namespace Karusc.Server.Application.Products.Get
{
    public record GetProductsQuery(int PageSize, int PageNumber) : IRequest<List<ProductDto>>;
}
