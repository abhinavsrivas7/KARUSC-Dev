using Karusc.Server.Application.Contracts;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Karusc.Server.Application.Products.SearchDiscovery
{
    internal sealed class GetProductsSearchDiscoveryQueryHandler : 
        IRequestHandler<GetProductsSearchDiscoveryQuery, List<SearchDiscoveryDto>>
    {
        private readonly IKaruscDbContext _context;

        public GetProductsSearchDiscoveryQueryHandler(IKaruscDbContext context) =>_context = context;

        public async Task<List<SearchDiscoveryDto>> Handle(
            GetProductsSearchDiscoveryQuery request, CancellationToken cancellationToken)
        {
            return await _context.Products
                .Where(product => product.Title.StartsWith(request.ProductName))
                .Select(product => new SearchDiscoveryDto(product.Id, product.Title))
                .Take(request.PageSize)
                .AsNoTracking()
                .ToListAsync(cancellationToken);
        } 
    }
}
