using MediatR;

namespace Karusc.Server.Application.Orders.ReturnOrder
{
    public record ReturnOrderCommand(Guid Id) : IRequest<OrderDto>;
}
