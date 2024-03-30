using Karusc.Server.Domain.Users;

namespace Karusc.Server.Application.Users
{
    internal record UserDto(
        Guid Id,
        string Email,
        string Name,
        string? ProfilePictureUrl,
        string Role)
    {
        internal UserDto(User user) : this(
            user.Id, 
            user.Email, 
            user.Name, 
            user.ProfilePictureURL, 
            user.Role.ToString()) { }

        internal UserDto EnrichProfilePicture(string? enrichmentPrefix) => this with
        {
            ProfilePictureUrl = string.IsNullOrEmpty(enrichmentPrefix)
                ? ProfilePictureUrl
                : string.Concat(enrichmentPrefix, ProfilePictureUrl)
        };
    };
}
