using Karusc.Server.Application.Contracts;
using Karusc.Server.Domain.LineItemEntities;
using Microsoft.EntityFrameworkCore;

namespace Karusc.Server.Application.LineItemEntities.Orders.CreateOrder
{
    internal abstract class CreateOrderCommandHandler : OrderRequestHandler
    {
        protected CreateOrderCommandHandler(
            IKaruscDbContext context, 
            ICurrentUserService currentUserService, 
            string? enrichmentPrefix) : base(context, currentUserService, enrichmentPrefix) { }

        protected async Task<Order> CreateOrder(Guid addressId, CancellationToken cancellationToken)
        {
            var currentUser = await _currentUserService.GetCurrentUser(cancellationToken);

            var address = await _context.Addresses
                .FirstOrDefaultAsync(
                    address => address.Id == addressId && address.UserId == currentUser.Id,
                    cancellationToken)
                ?? throw new KeyNotFoundException("Address with the specified ID doesnt exist.");

            return Order.Create(currentUser, address);
        }
    }
}
