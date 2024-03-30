using MediatR;

namespace Karusc.Server.Application.LineItemEntities.Carts.RemoveFromCart
{
    public record RemoveFromCartCommand(Guid LineItemId) : IRequest<CartDto>;
}
