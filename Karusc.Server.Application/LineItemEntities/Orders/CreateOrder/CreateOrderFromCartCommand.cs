using MediatR;

namespace Karusc.Server.Application.LineItemEntities.Orders.CreateOrder
{
    public record CreateOrderFromCartCommand(
        Guid ShippingAddressId, 
        Guid BillingAddressId) : IRequest<OrderDto>;
}
