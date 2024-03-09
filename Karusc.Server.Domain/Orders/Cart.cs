using Karusc.Server.Domain.Users;

namespace Karusc.Server.Domain.Orders
{
    public sealed class Cart : LineItemEntity<Cart>
    {
        private Cart() : base() {}

        public static Cart Create(User owner) 
        {
            var cart = new Cart();
            cart.Owner = owner;
            cart.OwnerId = owner.Id;
            return cart;
        }
    }
}
