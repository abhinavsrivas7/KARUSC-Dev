using Karusc.Server.Application.Contracts;
using Karusc.Server.Domain.LineItemEntities;
using Microsoft.EntityFrameworkCore;

namespace Karusc.Server.Application.LineItemEntities.Carts
{
    internal abstract class CartRequestHandler : LineItemRequesthandler<Cart>
    {
        private readonly string? _enrichmentPrefix;

        protected CartRequestHandler(
            ICurrentUserService currentUserService,
            IKaruscDbContext context,
            string? enrichmentPrefix) : base(context, currentUserService) => 
            _enrichmentPrefix = enrichmentPrefix;

        protected async Task<CartDto> HandleCartOperationAsync(
            Action<Cart>? operation,
            CancellationToken cancellationToken) => new CartDto(
                await HandleLineItemEntityOperationAsync(operation, cancellationToken))
                .EnrichLineItems(_enrichmentPrefix);

        protected override IQueryable<Cart> GetLineItemQueryable() => _context.Carts
            .Include(cart => cart.LineItems)
            .ThenInclude(lineItem => lineItem.Product)
            .ThenInclude(product => product.Images);

        protected override Task<Cart> SaveEntity(Cart entity, CancellationToken cancellationToken) => 
            throw new NotImplementedException();
    }
}
