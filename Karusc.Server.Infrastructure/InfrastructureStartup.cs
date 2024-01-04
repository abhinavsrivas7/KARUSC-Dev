using Karusc.Server.Application.Contracts;
using Karusc.Server.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Pomelo.EntityFrameworkCore.MySql.Infrastructure;
using System.Reflection;

namespace Karusc.Server.Infrastructure
{
    public static class InfrastructureStartup
    {
        private const string _connectionStringConfigName = "KaruscDB";
        private const string _connectionStringEnvironmentVariable = "KARUSC_DB_CONNECTION_STRING";

        private static void AddPersistence(this IServiceCollection services, IConfiguration configuration)
        {
            var connectionString = GetConnectionString(configuration);
            
            services.AddDbContextPool<KaruscDbContext>(options => options.UseMySql(
                connectionString,
                ServerVersion.AutoDetect(connectionString),
                action => action.MigrationsAssembly(Assembly.GetExecutingAssembly().FullName)));

            services.AddScoped<IKaruscDbContext, KaruscDbContext>();
        }

        private static string GetConnectionString(IConfiguration configuration)
        {
            var connectionString = configuration.GetConnectionString(_connectionStringConfigName);

            connectionString = string.IsNullOrEmpty(connectionString)
                ? configuration[_connectionStringEnvironmentVariable]
                : connectionString;

            return !string.IsNullOrEmpty(connectionString) 
                ? connectionString 
                : throw new KeyNotFoundException("connection string");
        }

        public static void AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
        {
            AddPersistence(services, configuration);
        }
    }
}
