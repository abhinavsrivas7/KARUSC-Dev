using Karusc.Server.Domain.Users;
using MediatR;

namespace Karusc.Server.Application.Users.SignUp
{
    public record SignUpCommand(
        string Email, 
        string Password, 
        Role Role, 
        string ProfilePicture ) : IRequest<UserDto>;
}
            