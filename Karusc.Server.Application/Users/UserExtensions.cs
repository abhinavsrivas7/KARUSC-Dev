using Karusc.Server.Application.Contracts;
using Karusc.Server.Domain.Users;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;
using System.Threading;

namespace Karusc.Server.Application.Users
{
    internal static class UserExtensions
    {
        internal static string HashPassword(this string password) => SHA256
            .HashData(Encoding.UTF8.GetBytes(password))
            .Aggregate(
                new StringBuilder(), 
                (builder, hashByte) => builder.Append(hashByte.ToString("X2")))
            .ToString();

        internal static async Task<UserDto> SaveUser(
            this CreateUserCommand command,
            IFileStorageService<User> fileStorageService,
            IKaruscDbContext context,
            CancellationToken cancellationToken)
        {
            var user = User.Create(
                command.Email,
                command.Name,
                command.Password.HashPassword(),
                command.Role,
                command.ProfilePicture);

            if (!string.IsNullOrEmpty(user.ProfilePictureURL) && user.ProfilePicture is not null)
            {
                user.ProfilePictureURL = await fileStorageService
                .Upload(user.ProfilePicture, cancellationToken);
            }

            await context.Users.AddAsync(user, cancellationToken);
            await context.SaveChangesAsync(cancellationToken);
            
            return new UserDto(
                user.Id,
                user.Email,
                user.Name,
                string.IsNullOrEmpty(fileStorageService.EnrichmentPrefix)
                    ? user.ProfilePictureURL
                    : string.IsNullOrEmpty(user.ProfilePictureURL)
                    ? user.ProfilePictureURL
                    : string.Concat(fileStorageService.EnrichmentPrefix, user.ProfilePictureURL),
                user.Role.ToString());
        }
    }
}
