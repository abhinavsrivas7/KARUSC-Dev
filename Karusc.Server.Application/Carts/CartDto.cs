using Karusc.Server.Domain.Orders;

namespace Karusc.Server.Application.Carts
{
    internal record CartDto(Guid Id, Guid OwnerId, List<LineItemDto<Cart>> LineItems, decimal TotalAmount)
    {
        internal CartDto(Cart cart) 
            : this(
                  cart.Id, 
                  cart.OwnerId!.Value, 
                  cart.LineItems!.Select(lineItem => new LineItemDto<Cart>(lineItem)).ToList(), 
                  cart.TotalAmount) { }

        internal CartDto EnrichLineItems(string? enrichmentPrefix) => 
            string.IsNullOrEmpty(enrichmentPrefix)
                ? this
                : this with
                {
                    LineItems = LineItems
                        .Select(lineItem => lineItem.EnrichProductImages(enrichmentPrefix))
                        .ToList()
                };
    };
}
