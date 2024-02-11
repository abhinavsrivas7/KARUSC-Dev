using Karusc.Server.Application.Contracts;
using Karusc.Server.Domain.Products;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Karusc.Server.Application.Products.GetById
{
    internal sealed class GetProductByIdQueryHandler : 
        IRequestHandler<GetProductByIdQuery, ProductDto>
    {
        private readonly IKaruscDbContext _context;
        private readonly string? _enrichmentPrefix;

        public GetProductByIdQueryHandler(
            IKaruscDbContext context,
            IFileStorageService<Product> fileStorageService) =>
            (_context, _enrichmentPrefix) = (context, fileStorageService.EnrichmentPrefix);

        public async Task<ProductDto> Handle(
            GetProductByIdQuery request,
            CancellationToken cancellationToken)
        {
            var product = (await _context.Products
                .Where(product => product.Id == request.Id)
                .Select(ProductExpressions.Selector)              
                .FirstOrDefaultAsync(cancellationToken))
                ?? throw new KeyNotFoundException(request.Id.ToString());

            return !string.IsNullOrEmpty(_enrichmentPrefix)
                ? product.EnrichImageNames(_enrichmentPrefix) 
                : product;
        }
    }
}
