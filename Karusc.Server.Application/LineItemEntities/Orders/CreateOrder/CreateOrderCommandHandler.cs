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

        protected async Task<Order> CreateOrder(
            Guid shippingAddressId, 
            Guid billingAddressId, 
            CancellationToken cancellationToken)
        {
            var currentUser = await _currentUserService.GetCurrentUser(cancellationToken);

            var shippingAddress = await _context.Addresses
                .FirstOrDefaultAsync(
                    address => address.Id == shippingAddressId && address.UserId == currentUser.Id,
                    cancellationToken)
                ?? throw new KeyNotFoundException("Shipping Address with the specified ID doesnt exist.");

            var billingAddress = shippingAddressId == billingAddressId
                ? shippingAddress
                : await _context.Addresses
                    .FirstOrDefaultAsync(
                        address => address.Id == billingAddressId && address.UserId == currentUser.Id,
                        cancellationToken)
                    ?? throw new KeyNotFoundException("Billing Address with the specified ID doesnt exist.");

            return Order.Create(currentUser, shippingAddress, billingAddress);
        }
    }
}
