using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Karusc.Server.Infrastructure.Persistence;
using Karusc.Server.Infrastructure.FileStorage;

namespace Karusc.Server.Infrastructure
{
    public static class InfrastructureStartup
    {
        public static void AddInfrastructure(
            this IServiceCollection services, 
            IConfiguration configuration,
            string environment)
        {
            services.AddPersistence(configuration);
            services.AddFileStorage(environment);
        }
    }
}
