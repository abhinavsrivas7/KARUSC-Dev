using Karusc.Server.Application.Contracts;
using Karusc.Server.Domain;
using MediatR;

namespace Karusc.Server.Application.Products.Create
{
    internal sealed class CreateProductCommandHandler : IRequestHandler<CreateProductCommand, Product>
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

        public async Task<Product> Handle(CreateProductCommand command, CancellationToken cancellationToken)
        {
            var product = Product.Create(
                command.Title,
                command.Price,
                command.Description,
                command.Category,
                command.Images);

            if (product.Images is not null && product.Images.Any())
            {
                await _fileStorageService.BulkUpload(product.Images);
            }

            await _context.Products.AddAsync(product, cancellationToken);
            await _context.SaveChangesAsync(cancellationToken);
            return product;
        }
    }
}