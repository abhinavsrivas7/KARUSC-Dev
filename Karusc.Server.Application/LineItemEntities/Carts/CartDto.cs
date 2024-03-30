using Karusc.Server.Domain.LineItemEntities;

namespace Karusc.Server.Application.LineItemEntities.Carts
{
    internal record CartDto(Guid Id, Guid OwnerId, List<LineItemDto<Cart>> LineItems)
    {
        internal CartDto(Cart cart) : this(
            cart.Id,
            cart.OwnerId,
            cart.LineItems!.Select(lineItem => new LineItemDto<Cart>(lineItem)).ToList()) { }

        internal CartDto EnrichLineItems(string? enrichmentPrefix) => string.IsNullOrEmpty(enrichmentPrefix)
            ? this
            : this with
            {
                LineItems = LineItems
                    .Select(lineItem => lineItem.EnrichProductImages(enrichmentPrefix))
                    .ToList()
            };
    };
}
