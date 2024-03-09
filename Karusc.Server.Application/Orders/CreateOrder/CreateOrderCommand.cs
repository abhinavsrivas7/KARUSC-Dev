using MediatR;

namespace Karusc.Server.Application.Orders.CreateOrder
{
    public record CreateOrderCommand() : IRequest<OrderDto>;
}
