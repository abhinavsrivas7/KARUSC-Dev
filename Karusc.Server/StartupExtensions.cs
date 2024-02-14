using Karusc.Server.Infrastructure;
using Karusc.Server.Infrastructure.Configuration;
using Microsoft.Extensions.FileProviders;

namespace Karusc.Server
{
    public static class StartupExtensions
    {
        public const string CorsPolicy = "karusc-cors-policy";
        private const string _corsConfigSection = "CLIENT-CORS-ORIGIN";

        public static void AddCorsFromConfig(
            this IServiceCollection services,
            IConfiguration configuration) => services
                .AddCors(options => options
                    .AddPolicy(CorsPolicy, policy => policy
                        .WithOrigins(configuration.GetSection(_corsConfigSection).Value!)
                        .AllowAnyHeader()
                        .AllowAnyMethod()));

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

        
    }
}
