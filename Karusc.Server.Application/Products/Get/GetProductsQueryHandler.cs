using Karusc.Server.Application.Contracts;
using Karusc.Server.Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Karusc.Server.Application.Products.Get
{
    internal sealed class GetProductsQueryHandler : 
        IRequestHandler<GetProductsQuery, List<ProductDto>>
    {
        private readonly IKaruscDbContext _context;
        private readonly string? _enrichmentPrefix;

        public GetProductsQueryHandler(
            IKaruscDbContext context,
            IFileStorageService<Product> fileStorageService) => 
            (_context, _enrichmentPrefix) = (context, fileStorageService.EnrichmentPrefix);

        public async Task<List<ProductDto>> Handle(
            GetProductsQuery request, 
            CancellationToken cancellationToken)
        {
            var products = await _context.Products
                .Include(product => product.Images)
                .Skip(request.PageSize * request.PageNumber)
                .Take(request.PageSize)
                .ToListAsync(cancellationToken);

            if(_enrichmentPrefix is not null)
            {
                products.ForEach(product => product.EnrichImageNames(_enrichmentPrefix));
            }

            return products.Select(product => new ProductDto(product)).ToList();
        } 
    }
}
