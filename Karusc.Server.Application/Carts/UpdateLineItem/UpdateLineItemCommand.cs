using MediatR;

namespace Karusc.Server.Application.Carts.UpdateLineItem
{
    public record UpdateLineItemCommand(Guid LineItemId, int IncrementQuantity) : IRequest<CartDto>;
}
