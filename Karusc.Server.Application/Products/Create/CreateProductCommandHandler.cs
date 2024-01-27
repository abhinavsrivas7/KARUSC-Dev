using Karusc.Server.Application.Contracts;
using Karusc.Server.Domain;
using MediatR;

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
                command.Category,
                command.Images);

            if (product.Images is not null && product.Images.Any())
            {
                product.UpdateImageNames(await _fileStorageService
                    .BulkUpload(product.Images, cancellationToken));
            }

            await _context.Products.AddAsync(product, cancellationToken);
            await _context.SaveChangesAsync(cancellationToken);
            
            return _fileStorageService.EnrichmentPrefix is not null
                ? new ProductDto(product).EnrichImageNames(_fileStorageService.EnrichmentPrefix)
                : new ProductDto(product);
        }
    }
}