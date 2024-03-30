using Karusc.Server.Application.Contracts;
using Karusc.Server.Domain.Users;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace Karusc.Server.Infrastructure.Authentication
{
    internal sealed class CurrentUserService : ICurrentUserService
    {
        private HttpContext _httpContext;
        private IKaruscDbContext _dbContext;
        private User? _cachedCurrentUser = null;

        public CurrentUserService(
            IHttpContextAccessor httpContextAccessor, 
            IKaruscDbContext dbContext) =>
            (_httpContext, _dbContext) = (httpContextAccessor.HttpContext!, dbContext);
        
        public async Task<User> GetCurrentUser(CancellationToken cancellationToken)
        {
            if(_cachedCurrentUser is null)
            {
                var idClaim = _httpContext.User.Claims
                .FirstOrDefault(claim => claim.Type.Equals(nameof(User.Id).ToLower()));

                if (idClaim is null)
                {
                    throw new InvalidOperationException("Invalid JWT");
                }

                var user = await _dbContext.Users.FirstOrDefaultAsync(
                    user => user.Id == Guid.Parse(idClaim.Value),
                    cancellationToken)
                    ?? throw new KeyNotFoundException(idClaim.Value);

                _cachedCurrentUser = user;
            }
            
            return _cachedCurrentUser;
        }
    }
}
