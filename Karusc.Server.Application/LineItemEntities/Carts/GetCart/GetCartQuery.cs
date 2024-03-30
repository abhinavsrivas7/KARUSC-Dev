using MediatR;

namespace Karusc.Server.Application.LineItemEntities.Carts.GetCart
{
    public record GetCartQuery : IRequest<CartDto>;
}
