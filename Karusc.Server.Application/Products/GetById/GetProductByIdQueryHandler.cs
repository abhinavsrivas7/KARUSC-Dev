using Karusc.Server.Application.Categories;
using Karusc.Server.Application.Collections;
using Karusc.Server.Application.Contracts;
using Karusc.Server.Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Linq;

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
            var product = await _context.Products
                .Select(product => new ProductDto(
                    product.Id,
                    product.Title,
                    product.Price,
                    product.Description,
                    product.Images!.Select(image => image.FileName).ToList(),
                    product.Categories!
                        .Select(category => new CategoryDto(
                            category.Id,
                            category.Name,
                            category.ImageURL!))
                        .ToList(),
                    product.Collections!
                        .Select(collection => new CollectionDTO(
                            collection.Id,
                            collection.Name,
                            collection.ImageURL!))
                        .ToList()))
                .FirstOrDefaultAsync(product => product.Id == request.Id, cancellationToken)
                ?? throw new KeyNotFoundException(request.Id.ToString());

            return !string.IsNullOrEmpty(_enrichmentPrefix)
                ? product.EnrichImageNames(_enrichmentPrefix) 
                : product;
        }
    }
}
