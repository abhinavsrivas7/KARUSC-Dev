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
        private readonly IFileStorageService<Product> _fileStorageService;

        public GetProductsQueryHandler(
            IKaruscDbContext context,
            IFileStorageService<Product> fileStorageService) => 
            (_context, _fileStorageService) = (context, fileStorageService);

        public async Task<List<ProductDto>> Handle(
            GetProductsQuery request, 
            CancellationToken cancellationToken)
        {
            var products = await _context.Products
                .Include(product => product.Images)
                .Skip(request.PageSize * request.PageNumber)
                .Take(request.PageSize)
                .ToListAsync(cancellationToken);

            if(_fileStorageService.EnrichmentPrefix is not null)
            {
                products.ForEach(product => product
                    .EnrichImageNames(_fileStorageService.EnrichmentPrefix));
            }

            return products.Select(product => new ProductDto(product)).ToList();
        } 
    }
}
