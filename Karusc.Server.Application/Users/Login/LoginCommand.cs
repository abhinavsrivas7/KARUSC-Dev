using MediatR;

namespace Karusc.Server.Application.Users.Login
{
    public record LoginCommand(string Email, string Password) : IRequest<List<Token>>;

}
