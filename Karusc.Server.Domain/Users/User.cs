using Karusc.Server.Domain.Files;
using Karusc.Server.Domain.LineItemEntities;
using Karusc.Server.Domain.Reviews;

namespace Karusc.Server.Domain.Users
{
    public class User : FileEntity
    {
        public string Email { get; init; }
        public string Name { get; init; }
        public string PasswordHash { get; private set; }
        public string ProfilePictureURL { get; set; } = string.Empty;
        public File<User> ProfilePicture { get; private set; } = new();
        public Role Role { get; init; }
        public List<Address> Addresses { get; private set; } = new();
        public List<Review> Reviews { get; private set; } = new();
        public Cart Cart { get; set; } = null!;
        public Wishlist Wishlist { get; set; } = null!;
        public List<Order> Orders { get; set; } = new();

        private User(string email, string name, string passwordHash, Role role)
        {
            Email = email;
            Name = name;
            PasswordHash = passwordHash;
            Role = role;
        }

        public static User Create(
            string email, 
            string name,
            string passwordHash, 
            Role role,
            string profilePicture)
        {
            User user = new User(email, name, passwordHash, role);           
            
            user.ProfilePicture = new File<User>(user, profilePicture, string.Empty);
            user.ProfilePictureURL = user.ProfilePicture.FileName;   
            user.Cart = Cart.Create(user);
            user.Wishlist = Wishlist.Create(user);
            
            return user;
        }
    }
}
