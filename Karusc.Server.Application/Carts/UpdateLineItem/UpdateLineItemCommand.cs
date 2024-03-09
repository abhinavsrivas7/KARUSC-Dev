using MediatR;

namespace Karusc.Server.Application.Carts.UpdateLineItem
{
    public record UpdateLineItemCommand(Guid LineItemId, int incrementQuantity) 
        : IRequest<CartDto>;
}
