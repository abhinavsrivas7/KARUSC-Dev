using Karusc.Server.Application.Contracts;
using Karusc.Server.Domain.Products;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Karusc.Server.Application.LineItemEntities.Carts.AddToCart
{
    internal class AddLineItemsToCartCommandHandler : CartRequestHandler, IRequestHandler<AddLineItemsCommand, CartDto>
    {
        public AddLineItemsToCartCommandHandler(
            ICurrentUserService currentUserService,
            IKaruscDbContext context,
            IFileStorageService<Product> fileStorageService)
        : base(currentUserService, context, fileStorageService.EnrichmentPrefix) { }

        public async Task<CartDto> Handle(
            AddLineItemsCommand request,
            CancellationToken cancellationToken)
        {
            if (!request.LineItems.Any())
            {
                throw new InvalidDataException("Empty line items list supplied.");
            }

            var productIds = request.LineItems.Select(x => x.ProductId).ToHashSet();

            var products = await _context.Products
                .Include(product => product.Images)
                .Where(product => productIds.Contains(product.Id))
                .ToListAsync(cancellationToken);

            if(products.Count != request.LineItems.Count)
            {
                throw new KeyNotFoundException("Some products do not exist");
            }

            return await HandleCartOperationAsync(
                new(cart => {
                    var lineItems = request
                        .LineItems
                        .Select(li => {
                            var product = products.First(p => p.Id == li.ProductId);
                            return cart.AddLineItem(product, li.Quantity);
                        });

                    _context.CartLineItems.AddRangeAsync(lineItems, cancellationToken);
                }),
                cancellationToken);
        }
    }
}
