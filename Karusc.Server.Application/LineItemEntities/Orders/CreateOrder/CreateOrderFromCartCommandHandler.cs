using Karusc.Server.Application.Contracts;
using Karusc.Server.Domain.Products;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Karusc.Server.Application.LineItemEntities.Orders.CreateOrder
{
    internal sealed class CreateOrderFromCartCommandHandler : CreateOrderCommandHandler, 
        IRequestHandler<CreateOrderFromCartCommand, OrderDto>
    {
        public CreateOrderFromCartCommandHandler(
            IKaruscDbContext context, 
            ICurrentUserService currentUserService,
            IFileStorageService<Product> fileStorageService) 
            : base(context, currentUserService, fileStorageService.EnrichmentPrefix) { }

        public async Task<OrderDto> Handle(CreateOrderFromCartCommand request, CancellationToken cancellationToken)
        {
            var order = await CreateOrder(request.ShippingAddressId, request.BillingAddressId, cancellationToken);
            var currentUser = await _currentUserService.GetCurrentUser(cancellationToken);

            var cart = await _context.Carts
                .Include(cart => cart.LineItems)
                .ThenInclude(lineItem => lineItem.Product)
                .ThenInclude(product => product.Images)
                .FirstAsync(cart => cart.OwnerId == currentUser.Id, cancellationToken);

            return await HandleOrderOperationAsync(
                null,
                cancellationToken,
                () => order.AddLineItemsFromCart(cart));
        }
    }
}
