using Karusc.Server.Application.Contracts;
using Karusc.Server.Domain.Products;
using MediatR;

namespace Karusc.Server.Application.Carts.AddToCart
{
    internal sealed class AddToCartCommandHandler 
        : CartRequestHandler, IRequestHandler<AddToCartCommand, CartDto>
    {

        public AddToCartCommandHandler(
            ICurrentUserService currentUserService,
            IKaruscDbContext context,
            IFileStorageService<Product> fileStorageService)
        : base(currentUserService, context, fileStorageService.EnrichmentPrefix, false) { }

        public async Task<CartDto> Handle(
            AddToCartCommand request, 
            CancellationToken cancellationToken)
        {
            var product = await _context.Products.FindAsync(request.ProductId, cancellationToken)
                ?? throw new KeyNotFoundException("Product with the specified Id doesnt exist.");
                        
            return await HandleCartOperationAsync(
                cart => cart.AddLineItem(product, request.Quantity), 
                cancellationToken);
        }
    }
}