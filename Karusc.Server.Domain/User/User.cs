﻿using Karusc.Server.Domain.File;

namespace Karusc.Server.Domain.User
{
    public class User : FileEntity
    {
        public string Email { get; init; }
        public string PasswordHash { get; private set; }
        public string? ProfilePictureURL { get; set; } = null;
        public File<User>? ProfilePicture { get; private set; } = null;
        public Role Role { get; init; }

        private User(string email, string passwordHash, Role role)
        {
            Email = email;
            PasswordHash = passwordHash;
            Role = role;
        }

        public static User Create(
            string email, 
            string passwordHash, 
            Role role,
            string profilePicture)
        {
            User user = new User(email, passwordHash, role);
            user.ProfilePicture = new File<User>(user, profilePicture, string.Empty);
            user.ProfilePictureURL = user.ProfilePicture.FileName;
            return user;
        }
    }
}
