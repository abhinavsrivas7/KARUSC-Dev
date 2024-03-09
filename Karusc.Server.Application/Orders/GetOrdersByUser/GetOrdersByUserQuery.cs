using MediatR;

namespace Karusc.Server.Application.Orders.GetOrdersByUser
{
    public record GetOrdersByUserQuery : IRequest<List<OrderDto>>;
}
