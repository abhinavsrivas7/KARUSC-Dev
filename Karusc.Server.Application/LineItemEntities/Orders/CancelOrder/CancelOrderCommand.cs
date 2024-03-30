using Karusc.Server.Application.LineItemEntities.Orders;
using MediatR;

namespace Karusc.Server.Application.LineItemEntities.Orders.CancelOrder
{
    public record CancelOrderCommand(Guid Id) : IRequest<OrderDto>;
}
