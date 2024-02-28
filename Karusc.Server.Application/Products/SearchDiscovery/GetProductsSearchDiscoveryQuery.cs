using MediatR;

namespace Karusc.Server.Application.Products.SearchDiscovery
{
    public record GetProductsSearchDiscoveryQuery(
        int PageSize,
        string ProductName) : IRequest<List<SearchDiscoveryDto>>;
}
