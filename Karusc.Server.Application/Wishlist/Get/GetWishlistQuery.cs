using MediatR;

namespace Karusc.Server.Application.Wishlist.Get
{
    public record GetWishlistQuery : IRequest<WishlistDto>;
}
