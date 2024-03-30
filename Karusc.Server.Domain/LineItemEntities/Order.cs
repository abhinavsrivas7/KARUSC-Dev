using Karusc.Server.Domain.Products;
using Karusc.Server.Domain.Users;

namespace Karusc.Server.Domain.LineItemEntities
{
    public sealed class Order : LineItemEntity<Order>
    {
        public Address Address { get; private set; } = null!;
        public Guid AddressId { get; private set; }
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

        public Order AddLineItem(Product product, int quantity)
        {
            LineItems = [ LineItem<Order>.Create(product, quantity, this) ];
            return this;
        }

        public Order AddLineItemsFromCart(Cart cart)
        {
            LineItems = cart.LineItems
                .Select(lineItem => LineItem<Order>.Create(lineItem.Product, lineItem.Quantity, this))
                .ToList();

            cart.EmptyCart();
            return this;
        }
    }
}
