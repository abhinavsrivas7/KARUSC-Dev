using Karusc.Server.Domain.Users;

namespace Karusc.Server.Domain.Orders
{
    public sealed class Order : LineItemEntity<Order>
    {
        public Address? Address { get; private set; } = null;
        public Guid? AddressId { get; private set; } = null;
        public OrderStatus Status { get; private set; } = OrderStatus.Created;
        private Order() : base() { }

        public static Order Create(User owner, Address address)
        {
            var order = new Order();
            order.Owner = owner;
            order.OwnerId = owner.Id;
            order.Address = address;
            order.AddressId = address.Id;
            return order;
        }
    }
}
