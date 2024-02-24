using Karusc.Server.Domain.Users;

namespace Karusc.Server.Application.Contracts
{
    public interface ICurrentUserService
    {
        Task<User> GetCurrentUser(CancellationToken cancellationToken);
    }
}
