using Karusc.Server.Application.Contracts;
using Karusc.Server.Domain.Products;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Karusc.Server.Application.LineItemEntities.Carts.AddToCart
{
    internal sealed class AddToCartCommandHandler
        : CartRequestHandler, IRequestHandler<AddToCartCommand, CartDto>
    {
        public AddToCartCommandHandler(
            ICurrentUserService currentUserService,
            IKaruscDbContext context,
            IFileStorageService<Product> fileStorageService)
        : base(currentUserService, context, fileStorageService.EnrichmentPrefix) { }

        public async Task<CartDto> Handle(
            AddToCartCommand request,
            CancellationToken cancellationToken)
        {
            var product = await _context.Products
                .Include(product => product.Images)
                .FirstOrDefaultAsync(product => product.Id == request.ProductId, cancellationToken)
                ?? throw new KeyNotFoundException("Product with the specified Id doesnt exist.");

            return await HandleCartOperationAsync(
                new(cart => {
                    var lineItem = cart.AddLineItem(product, 1);
                    _context.CartLineItems.AddAsync(lineItem, cancellationToken);
                }),
                cancellationToken);
        }
    }
}