using Karusc.Server.Application.Contracts;
using Karusc.Server.Domain.Orders;
using Microsoft.EntityFrameworkCore;

namespace Karusc.Server.Application.Carts
{
    internal abstract class CartRequestHandler
    {
        protected readonly IKaruscDbContext _context;
        private readonly ICurrentUserService _currentUserService;
        private readonly string? _enrichmentPrefix;
        private readonly bool _isReadonlyRequest;

        protected CartRequestHandler(
            ICurrentUserService currentUserService,
            IKaruscDbContext context,
            string? enrichmentPrefix,
            bool isReadonlyRequest)
        {
            _currentUserService = currentUserService;
            _context = context;
            _enrichmentPrefix = enrichmentPrefix;
            _isReadonlyRequest = isReadonlyRequest;
        }

        protected async Task<CartDto> HandleCartOperationAsync(
            Action<Cart> operation, 
            CancellationToken cancellationToken)
        {
            var cart = await GetCart(cancellationToken);
            
            if(!_isReadonlyRequest)
            {
                operation(cart);
                await _context.SaveChangesAsync(cancellationToken);
            }
            
            return new CartDto(cart).EnrichLineItems(_enrichmentPrefix);
        }

        private async Task<Cart> GetCart(CancellationToken cancellationToken)
        {
            var cartQueryable = _context.Carts
                .Include(cart => cart.LineItems!)
                .ThenInclude(lineItem => lineItem.Product!)
                .ThenInclude(product => product.Images);

            var modifiedCartQueryable = _isReadonlyRequest 
                ? cartQueryable.AsNoTracking() 
                : cartQueryable;

            var currentUser = await _currentUserService.GetCurrentUser(cancellationToken);
            
            return await modifiedCartQueryable
                .FirstAsync(cart => cart.Id == currentUser.CartId, cancellationToken);
        }
    }
}
