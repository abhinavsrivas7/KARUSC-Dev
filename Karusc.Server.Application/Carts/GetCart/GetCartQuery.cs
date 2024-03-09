using MediatR;

namespace Karusc.Server.Application.Carts.GetCart
{
    public record GetCartQuery : IRequest<CartDto>;
}
