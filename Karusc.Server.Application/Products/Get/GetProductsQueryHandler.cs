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
            GetProductsQuery request, CancellationToken cancellationToken)
        {
            var products = await _context.Products
                .Select(product => new ProductDto(
                    product.Id, 
                    product.Title, 
                    product.Price, 
                    product.Description, 
                    product.Images!.Select(image => image.FileName).ToList()))
                .Skip(request.PageSize * request.PageNumber)
                .Take(request.PageSize)
                .ToListAsync(cancellationToken);

            return !string.IsNullOrEmpty(_enrichmentPrefix)
                ? products.Select(product => product.EnrichImageNames(_enrichmentPrefix))
                    .ToList()
                : products;
        } 
    }
}
