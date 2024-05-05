using Karusc.Server.Infrastructure.Authentication;
using Karusc.Server.Infrastructure.FileStorage;
using Karusc.Server.Infrastructure.Payments;
using Karusc.Server.Infrastructure.Persistence;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Karusc.Server.Infrastructure
{
    public static class InfrastructureStartup
    {
        private const string _localEnvironmentName = "Local";
        public static void AddInfrastructure(
            this IServiceCollection services, 
            IConfiguration configuration,
            IWebHostEnvironment environment)
        {
            services.AddPersistence(configuration);
            services.AddFileStorage(configuration, environment);
            services.AddAuthentication(configuration);
            services.AddPayments(configuration);
        }

        public static bool IsLocal(this IWebHostEnvironment environment) => environment
            .EnvironmentName.Equals(_localEnvironmentName);
    }
}
