using MediatR;

namespace Karusc.Server.Application.LineItemEntities.Orders.CreateOrder
{
    public record CreateOrderFromLineItemCommand(
        Guid ProductId, 
        int Quantity,
        Guid AddressId) : IRequest<OrderDto>;
}
