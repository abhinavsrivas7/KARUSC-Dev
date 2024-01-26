using Karusc.Server.Application.Contracts;
using Karusc.Server.Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Karusc.Server.Application.Products.GetById
{
    internal sealed class GetProductByIdQueryHandler : 
        IRequestHandler<GetProductByIdQuery, ProductDto>
    {
        private readonly IKaruscDbContext _context;
        private readonly IFileStorageService<Product> _fileStorageService;

        public GetProductByIdQueryHandler(
            IKaruscDbContext context,
            IFileStorageService<Product> fileStorageService) =>
            (_context, _fileStorageService) = (context, fileStorageService);

        public async Task<ProductDto> Handle(
            GetProductByIdQuery request,
            CancellationToken cancellationToken)
        {
            var product = await _context.Products
                .Include(product => product.Images)
                .FirstOrDefaultAsync(product => product.Id == request.Id, cancellationToken)
                ?? throw new KeyNotFoundException(request.Id.ToString());

            if(_fileStorageService.EnrichmentPrefix is not null)
            {
                product.EnrichImageNames(_fileStorageService.EnrichmentPrefix);
            }

            return new ProductDto(product);
        }
    }
}
