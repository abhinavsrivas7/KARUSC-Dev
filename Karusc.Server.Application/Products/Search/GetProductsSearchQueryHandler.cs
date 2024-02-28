using Karusc.Server.Application.Contracts;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Karusc.Server.Application.Products.Search
{
    internal sealed class GetProductsSearchQueryHandler : 
        IRequestHandler<GetProductsSearchQuery, List<ProductDto>>
    {
        private readonly IKaruscDbContext _context;

        public GetProductsSearchQueryHandler(IKaruscDbContext context) =>_context = context;

        public async Task<List<ProductDto>> Handle(
            GetProductsSearchQuery request, CancellationToken cancellationToken)
        {
            return await _context.Products
                .Where(product => product.Title.StartsWith(request.ProductName))
                .Select(ProductExpressions.SelectorWithoutJoin)
                .Take(request.PageSize)
                .AsNoTracking()
                .ToListAsync(cancellationToken);
        } 
    }
}
