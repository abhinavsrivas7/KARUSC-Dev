namespace Karusc.Server.Application.Users
{
    public record UserDto(Guid Id, string Email, string Name, string? ProfilePictureUrl);
}
