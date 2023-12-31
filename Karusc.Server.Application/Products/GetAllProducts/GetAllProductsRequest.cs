using Karusc.Server.Domain;
using MediatR;

namespace Karusc.Server.Application.Products.GetAllProducts
{
    public record GetAllProductsRequest(
        int pageSize,
        int pageNumber) : IRequest<List<Product>>;
}
