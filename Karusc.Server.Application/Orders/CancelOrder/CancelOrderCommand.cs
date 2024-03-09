using MediatR;

namespace Karusc.Server.Application.Orders.CancelOrder
{
    public record CancelOrderCommand(Guid Id) : IRequest<OrderDto>;
}
