using Karusc.Server.Domain.Users;

namespace Karusc.Server.Application.Users
{
    public record UserDto(
        Guid Id,
        string Email,
        string Name,
        string? ProfilePictureUrl,
        string Role)
    {
        public UserDto(User user) : this(
            user.Id, 
            user.Email, 
            user.Name, 
            user.ProfilePictureURL, 
            user.Role.ToString()) { }
    };
}
