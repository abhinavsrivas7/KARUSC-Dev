using Karusc.Server.Application.Addresses;
using Karusc.Server.Domain.LineItemEntities;

namespace Karusc.Server.Application.LineItemEntities.Orders
{
    internal record OrderDto(
        Guid Id, 
        Guid OwnerId, 
        List<LineItemDto<Order>> LineItems, 
        AddressDto ShippingAddress,
        AddressDto BillingAddress,
        string status)
    {
        internal OrderDto(Order order) : this(
            order.Id,
            order.OwnerId,
            order.LineItems
                .Select(lineItem => new LineItemDto<Order>(lineItem))
                .ToList(),
            new(order.ShippingAddress),
            new(order.BillingAddress),
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
