using MediatR;

namespace Karusc.Server.Application.Orders.GetOrderById
{
    public record GetOrderByIdQuery(Guid Id) : IRequest<OrderDto>;
}
