using MediatR;

namespace Karusc.Server.Application.Products.Get
{
    public record GetProductsQuery(
        int PageSize,
        int PageNumber,
        HashSet<Guid> Categories,
        HashSet<Guid> Collections) : IRequest<ProductWithCountDto>;
}
