using Karusc.Server.Application.Contracts;
using Karusc.Server.Domain.Products;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Karusc.Server.Application.Test
{
    internal sealed class CreateBulkProductCommandHandler
        : IRequestHandler<CreateBulkProductCommand, string>
    {
        private readonly IKaruscDbContext _context;
        private readonly IFileStorageService<Product> _fileStorageService;

        public CreateBulkProductCommandHandler(
            IKaruscDbContext context,
            IFileStorageService<Product> fileStorageService)
        {
            _context = context;
            _fileStorageService = fileStorageService;
        }

        public async Task<string> Handle(
            CreateBulkProductCommand command,
            CancellationToken cancellationToken)
        {
            List<Product> productList = new List<Product>();

            for (int i = 1; i <= 1000; i++)
            {
                var product = Product.Create(
                    i.ToString(),
                    command.Price,
                    command.Description,
                    command.CareInstructions,
                    command.Images,
                    await GetCategories(command.Categories),
                    await GetCollections(command.Collections));

                if (product.Images is not null && product.Images.Any())
                {
                    product.UpdateImageNames(await _fileStorageService
                        .BulkUpload(product.Images, cancellationToken));
                }
                productList.Add(product);
            }

            await _context.Products.AddRangeAsync(productList, cancellationToken);
            await _context.SaveChangesAsync(cancellationToken);
            return "Created";

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