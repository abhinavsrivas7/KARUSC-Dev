using MediatR;

namespace Karusc.Server.Application.Carts.RemoveFromCart
{
    public record RemoveFromCartCommand(Guid LineItemId) : IRequest<CartDto>;
}
