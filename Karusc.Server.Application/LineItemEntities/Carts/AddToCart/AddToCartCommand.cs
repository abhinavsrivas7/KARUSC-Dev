using MediatR;

namespace Karusc.Server.Application.LineItemEntities.Carts.AddToCart
{
    public record AddToCartCommand(Guid ProductId) : IRequest<CartDto>;
}
