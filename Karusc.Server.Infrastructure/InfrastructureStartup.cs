using Karusc.Server.Application.Contracts;
using Karusc.Server.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System.Reflection;

namespace Karusc.Server.Infrastructure
{
    public static class InfrastructureStartup
    {
        private const string _connectionStringName = "KaruscDB";

        private static void AddPersistence(
            this IServiceCollection services,
            IConfiguration configuration)
        {
            var connectionString = configuration.GetConnectionString(_connectionStringName);
            
            services.AddDbContextPool<KaruscDbContext>(options => options.UseMySql(
                connectionString,
                ServerVersion.AutoDetect(connectionString),
                action => action.MigrationsAssembly(Assembly.GetExecutingAssembly().FullName)));

            services.AddScoped<IKaruscDbContext, KaruscDbContext>();
        }

        public static void AddInfrastructure(
            this IServiceCollection services,
            IConfiguration configuration)
        {
            AddPersistence(services, configuration);
        }
    }
}
