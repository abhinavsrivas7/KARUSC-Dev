using Karusc.Server.Domain.Users;

namespace Karusc.Server.Domain.Orders
{
    public sealed class Order : LineItemEntity<Order>
    {
        public Address? Address { get; private set; } = null;
        public Guid? AddressId { get; private set; } = null;
        public OrderStatus Status { get; private set; } = OrderStatus.Created;
        private Order() : base() { }

        public static Order Create(User owner, Address address, List<LineItem<Order>> lineItems)
        {
            if(!lineItems.Any())
            {
                throw new InvalidOperationException("Cannot create order without line items.");
            }

            var order = new Order();
            order.Owner = owner;
            order.OwnerId = owner.Id;
            order.Address = address;
            order.AddressId = address.Id;
            order.LineItems = lineItems;
            return order;
        }
    }
}
