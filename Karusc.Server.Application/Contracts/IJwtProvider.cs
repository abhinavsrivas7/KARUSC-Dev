using Karusc.Server.Application.Users;
using Karusc.Server.Domain.Users;

namespace Karusc.Server.Application.Contracts
{
    public interface IJwtProvider
    {
        Token GenerateAccessToken(User user);
        Token GenerateRefreshToken(User user);
    }
}
