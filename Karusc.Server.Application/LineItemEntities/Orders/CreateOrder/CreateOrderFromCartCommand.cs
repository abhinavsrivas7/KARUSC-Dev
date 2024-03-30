using MediatR;

namespace Karusc.Server.Application.LineItemEntities.Orders.CreateOrder
{
    public record CreateOrderFromCartCommand(Guid AddressId) : IRequest<OrderDto>;
}
