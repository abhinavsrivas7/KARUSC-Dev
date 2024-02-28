using Karusc.Server.Domain.Users;
using MediatR;

namespace Karusc.Server.Application.Users
{
    public abstract record CreateUserCommand(
        string Email,
        string Name,
        string Password,
        string ProfilePicture) : IRequest<UserDto>
    {
        public abstract Role Role { get; }
    };
}
