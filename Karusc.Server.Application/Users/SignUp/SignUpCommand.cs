using MediatR;

namespace Karusc.Server.Application.Users.SignUp
{
    public record SignUpCommand(
        string Email, 
        string Name,
        string Password,
        string ProfilePicture) : IRequest<UserDto>;
}
            