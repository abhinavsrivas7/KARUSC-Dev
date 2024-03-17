using Karusc.Server.Domain.Files;
using Karusc.Server.Domain.Orders;
using Karusc.Server.Domain.Reviews;

namespace Karusc.Server.Domain.Users
{
    public class User : FileEntity
    {
        public string Email { get; init; }
        public string Name { get; init; }
        public string PasswordHash { get; private set; }
        public string? ProfilePictureURL { get; set; } = null;
        public File<User>? ProfilePicture { get; private set; } = null;
        public Role Role { get; init; }
        public List<Address>? Addresses { get; private set; } = null;
        public List<Review>? Reviews { get; private set; } = null;
        public Cart? Cart { get; set; } = null;
        public Guid? CartId { get; set; } = null;
        public List<Order>? Orders { get; set; } = null;

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
            user.CartId = user.Cart.Id;
            
            return user;
        }
    }
}
