using Karusc.Server.Application.Contracts;
using Karusc.Server.Domain;
using Karusc.Server.Domain.Product;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Karusc.Server.Application.Products.Create
{
    internal sealed class CreateProductCommandHandler 
        : IRequestHandler<CreateProductCommand, ProductDto>
    {
        private readonly IKaruscDbContext _context;
        private readonly IFileStorageService<Product> _fileStorageService;

        public CreateProductCommandHandler(
            IKaruscDbContext context, 
            IFileStorageService<Product> fileStorageService)
        {
            _context = context;
            _fileStorageService = fileStorageService;
        }

        public async Task<ProductDto> Handle(
            CreateProductCommand command, 
            CancellationToken cancellationToken)
        {            
            var product = Product.Create(
                command.Title,
                command.Price,
                command.Description,
                command.Images,
                await GetCategories(command.Categories),
                await GetCollections(command.Collections));

            if (product.Images is not null && product.Images.Any())
            {
                product.UpdateImageNames(await _fileStorageService
                    .BulkUpload(product.Images, cancellationToken));
            }

            await _context.Products.AddAsync(product, cancellationToken);
            await _context.SaveChangesAsync(cancellationToken);
            
            return !string.IsNullOrEmpty(_fileStorageService.EnrichmentPrefix)
                ? new ProductDto(product)
                    .EnrichImageNames(_fileStorageService.EnrichmentPrefix)
                : new ProductDto(product);
        }

        private async Task<List<Category>?> GetCategories(HashSet<Guid>? categories) =>
            categories is not null && categories.Any()
                ? await _context.Categories
                    .Where(category => categories.Contains(category.Id))
                    .ToListAsync()
                : null;

        private async Task<List<Collection>?> GetCollections(HashSet<Guid>? collections) =>
            collections is not null && collections.Any()
                ? await _context.Collections
                    .Where(category => collections.Contains(category.Id))
                    .ToListAsync()
                : null;
    }
}