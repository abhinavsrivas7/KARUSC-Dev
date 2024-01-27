using Karusc.Server.Infrastructure.Configuration;
using Microsoft.Extensions.FileProviders;

namespace Karusc.Server
{
    public static class StartupExtensions
    {
        public const string CorsPolicy = "karusc-cors-policy";
        private const string _corsConfigSection = "CLIENT-CORS-ORIGIN";
        private const string _localEnvironmentName = "Local";

        public static void AddCorsFromConfig(
            this IServiceCollection services,
            IConfiguration configuration) => services
                .AddCors(options => options
                    .AddPolicy(CorsPolicy, policy => policy
                        .WithOrigins(configuration.GetSection(_corsConfigSection).Value!)
                        .AllowAnyHeader()
                        .AllowAnyMethod()));

        public static void AddConfigurationOptions(
            this IServiceCollection services,
            IWebHostEnvironment environment,
            IConfiguration configuration)
        {
            if (environment.IsLocal())
            {
                services.Configure<LocalFileStorage>(configuration
                    .GetSection(nameof(LocalFileStorage)));
            }
            else
            {
                services.Configure<BunnyFileStorage>(configuration
                    .GetSection(nameof(BunnyFileStorage)));
            }
        }

        public static void UseKaruscStaticFiles(
            this WebApplication app, 
            IWebHostEnvironment environment,
            IConfiguration configuration)
        {
            var localFileStorage = configuration
                .GetSection(nameof(LocalFileStorage))
                .Get<LocalFileStorage>();

            if (environment.IsLocal() && localFileStorage is not null)
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

        internal static bool IsLocal(this IWebHostEnvironment environment) => environment
            .EnvironmentName.Equals(_localEnvironmentName);
    }
}
