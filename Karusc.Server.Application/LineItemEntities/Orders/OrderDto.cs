using Karusc.Server.Application.Users;
using Karusc.Server.Domain.LineItemEntities;

namespace Karusc.Server.Application.LineItemEntities.Orders
{
    internal record OrderDto(
        Guid Id, 
        Guid OwnerId, 
        List<LineItemDto<Order>> LineItems, 
        AddressDto Address,
        string status)
    {
        internal OrderDto(Order order) : this(
            order.Id,
            order.OwnerId,
            order.LineItems
                .Select(lineItem => new LineItemDto<Order>(lineItem))
                .ToList(),
            new(order.Address),
            order.Status.ToString()) { }

        internal OrderDto EnrichLineItems(string? enrichmentprefix) => string.IsNullOrEmpty(enrichmentprefix)
            ? this
            : this with
            {
                LineItems = LineItems
                    .Select(lineItem => lineItem.EnrichProductImages(enrichmentprefix))
                    .ToList(),
            };
    }
}
