using Karusc.Server.Application.Contracts;
using Karusc.Server.Infrastructure.Configuration;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace Karusc.Server.Infrastructure.Authentication
{
    internal static class DependencyInjection
    {
        internal static void AddAuthentication(
            this IServiceCollection services, 
            IConfiguration configuration)
        {
            services.Configure<JwtConfiguration>(
                configuration.GetSection(nameof(JwtConfiguration)));

            services.AddScoped<IJwtProvider, JwtProvider>();

            JwtConfiguration jwtOptions = new();
            configuration.GetSection(nameof(JwtConfiguration)).Bind(jwtOptions);

            services
                .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,
                        ValidIssuer = jwtOptions.Issuer,
                        ValidAudience = jwtOptions.Audience,
                        IssuerSigningKey = new SymmetricSecurityKey(
                            Encoding.UTF8.GetBytes(jwtOptions.SecretKey)),
                        LifetimeValidator = (_, end, _, _) => end > DateTime.UtcNow
                    };
                });

            services.AddScoped<ICurrentUserService, CurrentUserService>();
        }
    }
}
