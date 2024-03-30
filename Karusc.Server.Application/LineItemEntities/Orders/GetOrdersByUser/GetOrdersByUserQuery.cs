using MediatR;

namespace Karusc.Server.Application.LineItemEntities.Orders.GetOrdersByUser
{
    public record GetOrdersByUserQuery : IRequest<List<OrderDto>>;
}
