using Karusc.Server.Domain.Products;

namespace Karusc.Server.Domain.Users
{
    public class Wishlist
    {
        public Guid Id { get; set; } = new Guid();
        public List<Product> Products { get; set; } = new();
        public User Owner { get; private set; } = null!;
        public Guid OwnerId { get; private set; }

        public Wishlist() { }

        public static Wishlist Create(User owner)
        {
            var wishlist = new Wishlist();
            wishlist.Owner = owner;
            wishlist.OwnerId = owner.Id;
            return wishlist;
        }
    }
}
