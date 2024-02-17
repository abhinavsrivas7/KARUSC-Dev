using Karusc.Server.Application.Users;
using Karusc.Server.Domain.Users;
using Microsoft.AspNetCore.Mvc.Filters;

namespace Karusc.Server.Infrastructure.Authentication
{
    public class HasRoleAttribute : Attribute, IAuthorizationFilter
    {
        private readonly Role _role;
        private readonly string _tokenType = TokenType.AccessToken.ToString();

        public HasRoleAttribute(Role role) => _role = role;

        public void OnAuthorization(AuthorizationFilterContext context)
        {
            var tokenTypeClaim = context.HttpContext.User.Claims
                .FirstOrDefault(claim => claim.Type.Equals(nameof(TokenType).ToLower()));

            if(tokenTypeClaim is null || !tokenTypeClaim.Value.Equals(_tokenType)) 
            {
                throw new InvalidOperationException("Invalid JWT");
            }

            var roleClaim = context.HttpContext.User.Claims
                .FirstOrDefault(claim => claim.Type.Contains(nameof(Role).ToLower()));

            if (roleClaim is null || !roleClaim.Value.Equals(_role.ToString()))
            {
                throw new InvalidOperationException("Invalid JWT");
            }
        }
    }
}
