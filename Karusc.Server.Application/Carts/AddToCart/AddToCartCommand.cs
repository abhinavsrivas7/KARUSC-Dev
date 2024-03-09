using MediatR;

namespace Karusc.Server.Application.Carts.AddToCart
{
    public record AddToCartCommand(Guid ProductId, int Quantity) : IRequest<CartDto>;
}
