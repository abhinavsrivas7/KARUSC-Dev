using Karusc.Server.Application.Users;
using Karusc.Server.Domain.Users;

namespace Karusc.Server.Application.Contracts
{
    public interface IJwtProvider
    {
        Token GenerateToken(User user, TokenType tokenType);
    }
}
