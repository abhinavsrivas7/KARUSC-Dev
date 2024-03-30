using Karusc.Server.Application.LineItemEntities.Orders;
using MediatR;

namespace Karusc.Server.Application.LineItemEntities.Orders.ReturnOrder
{
    public record ReturnOrderCommand(Guid Id) : IRequest<OrderDto>;
}
