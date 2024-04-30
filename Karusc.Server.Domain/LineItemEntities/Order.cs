using Karusc.Server.Domain.Products;
using Karusc.Server.Domain.Users;

namespace Karusc.Server.Domain.LineItemEntities
{
    public sealed class Order : LineItemEntity<Order>
    {
        public Address ShippingAddress { get; private set; } = null!;
        public Guid ShippingAddressId { get; private set; }
        public Address BillingAddress { get; private set; } = null!;
        public Guid BillingAddressId { get; private set; }

        public OrderStatus Status { get; private set; } = OrderStatus.Created;
        private Order() : base() { }

        public static Order Create(User owner, Address shippingAddress, Address billingAddress)
        {
            var order = new Order();
            order.Owner = owner;
            order.OwnerId = owner.Id;
            
            if(shippingAddress.UserId != owner.Id)
            {
                throw new InvalidOperationException("Shipping Address does not belong to user");
            }

            order.ShippingAddress = shippingAddress;
            order.ShippingAddressId = shippingAddress.Id;

            if (billingAddress.UserId != owner.Id)
            {
                throw new InvalidOperationException("Billing Address does not belong to user");
            }

            order.BillingAddress = billingAddress;
            order.BillingAddressId = billingAddress.Id;
            return order;
        }

        public Order AddLineItem(Product product, int quantity)
        {
            LineItems = [ LineItem<Order>.Create(product, quantity, this) ];
            return this;
        }

        public Order AddLineItemsFromCart(Cart cart)
        {
            if(cart.OwnerId != OwnerId)
            {
                throw new InvalidOperationException("Cart does not belong to user");
            }

            LineItems = cart.LineItems
                .Select(lineItem => LineItem<Order>.Create(lineItem.Product, lineItem.Quantity, this))
                .ToList();

            cart.EmptyCart();
            return this;
        }
    }
}
