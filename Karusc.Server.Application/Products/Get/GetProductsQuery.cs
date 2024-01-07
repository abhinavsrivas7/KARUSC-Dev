using Karusc.Server.Domain;
using MediatR;

namespace Karusc.Server.Application.Products.Get
{
    public record GetProductsQuery(
        int pageSize,
        int pageNumber) : IRequest<List<Product>>;
}
