using Karusc.Server.Application.Contracts;
using Karusc.Server.Infrastructure.Configuration;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Karusc.Server.Infrastructure.FileStorage
{
    internal static class DependencyInjection
    {
        private const string _localEnvironmentName = "Local";
        internal static void AddFileStorage(
            this IServiceCollection services,
            IConfiguration configuration,
            IWebHostEnvironment environment)
        {
            if (environment.IsLocal())
            {
                services.Configure<LocalFileStorage>(configuration
                    .GetSection(nameof(LocalFileStorage)));

                services.AddScoped(typeof(IFileStorageService<>), 
                    typeof(LocalFileStorageService<>));
            }
            else
            {
                services.Configure<BunnyFileStorage>(configuration
                    .GetSection(nameof(BunnyFileStorage)));

                services.AddScoped(typeof(IFileStorageService<>), 
                    typeof(BunnyFileStorageService<>));
            }
        }
    }
}
