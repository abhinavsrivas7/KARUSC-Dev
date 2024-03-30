using MediatR;

namespace Karusc.Server.Application.LineItemEntities.Orders.GetOrderById
{
    public record GetOrderByIdQuery(Guid Id) : IRequest<OrderDto>;
}
