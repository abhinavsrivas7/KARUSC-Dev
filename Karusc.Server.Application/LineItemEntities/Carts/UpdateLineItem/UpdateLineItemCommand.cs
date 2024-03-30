using MediatR;

namespace Karusc.Server.Application.LineItemEntities.Carts.UpdateLineItem
{
    public record UpdateLineItemCommand(Guid LineItemId, int IncrementQuantity) : IRequest<CartDto>;
}
