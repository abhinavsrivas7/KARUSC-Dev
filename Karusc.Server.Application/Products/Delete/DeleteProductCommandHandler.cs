using Karusc.Server.Application.Categories;
using Karusc.Server.Application.Collections;
using Karusc.Server.Application.Contracts;
using Karusc.Server.Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Karusc.Server.Application.Products.Delete
{
    internal sealed class DeleteProductCommandHandler 
        : IRequestHandler<DeleteProductCommand, Guid>
    {
        private readonly IKaruscDbContext _context;
        private readonly IFileStorageService<Product> _fileStorageService;
        
        public DeleteProductCommandHandler(
            IKaruscDbContext context, IFileStorageService<Product> fileStorageService) => 
            (_context, _fileStorageService) = (context, fileStorageService);

        public async Task<Guid> Handle(
            DeleteProductCommand request, 
            CancellationToken cancellationToken)
        {
            var product = await _context.Products
                .Where(product => product.Id == request.Id)
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
                .FirstOrDefaultAsync(cancellationToken)
                ?? throw new KeyNotFoundException(request.Id.ToString());

            _context.Products
                .Remove(await _context.Products.FindAsync(request.Id, cancellationToken)
                ?? throw new KeyNotFoundException(request.Id.ToString()));
            
            await _context.SaveChangesAsync(cancellationToken);

            if(product.Images is not null && product.Images.Any())
            {
                await _fileStorageService.BulkDelete(product.Images, cancellationToken);
            }
            
            return request.Id;
        }
    }
}
