using MediatR;

namespace Karusc.Server.Application.LineItemEntities.Carts.AddToCart
{
    public record AddLineItemsCommand(List<LineItemInput> LineItems) : IRequest<CartDto>;

    public record LineItemInput(Guid ProductId, int Quantity);
}
