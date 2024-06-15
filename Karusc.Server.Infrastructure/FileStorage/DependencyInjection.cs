using Karusc.Server.Application.Contracts;
using Karusc.Server.Infrastructure.Configuration;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;

namespace Karusc.Server.Infrastructure.FileStorage
{
    public static class DependencyInjection
    {
        private const string _localEnvironmentName = "Local";
        
        internal static void AddFileStorage(
            this IServiceCollection services,
            IConfiguration configuration,
            IWebHostEnvironment environment)
        {
            if (environment.IsLocal())
            {
                services.Configure<LocalFileStorage>(configuration.GetSection(nameof(LocalFileStorage)));
                services.AddScoped(typeof(IFileStorageService<>), typeof(LocalFileStorageService<>));
            }
            else
            {
                services.Configure<BunnyFileStorage>(configuration.GetSection(nameof(BunnyFileStorage)));
                services.AddScoped(typeof(IFileStorageService<>), typeof(BunnyFileStorageService<>));
            }
        }

        public static void UseKaruscStaticFiles(this WebApplication app)
        {
            var localFileStorage = app.Configuration
                .GetSection(nameof(LocalFileStorage))
                .Get<LocalFileStorage>();

            if (app.Environment.IsLocal() && localFileStorage is not null)
            {
                app.UseStaticFiles(new StaticFileOptions()
                {
                    FileProvider = new PhysicalFileProvider(localFileStorage.DirectoryPath),
                    RequestPath = localFileStorage.RequestPath
                });
            }
            else
            {
                app.UseStaticFiles();
            }
        }
    }
}
