using Karusc.Server.Application.Contracts;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;
using System.Reflection;
using Microsoft.AspNetCore.Builder;

namespace Karusc.Server.Infrastructure.Persistence
{
    public static class DependencyInjection
    {
        private const string _connectionStringConfigName = "KaruscDB";
        private const string _connectionStringEnvironmentVariable = "KARUSC_DB_CONNECTION_STRING";

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

        internal static void AddPersistence(this IServiceCollection services, IConfiguration configuration)
        {
            var connectionString = GetConnectionString(configuration);

            services.AddDbContextPool<KaruscDbContext>(options => options.UseMySql(
                connectionString,
                ServerVersion.AutoDetect(connectionString),
                action => action.MigrationsAssembly(Assembly.GetExecutingAssembly().FullName)));

            services.AddScoped<IKaruscDbContext, KaruscDbContext>();
        }

        public static void ApplyMigrations(this WebApplication app)
        {
            using var scope = app.Services.CreateScope();
            var karuscContext = scope.ServiceProvider.GetRequiredService<IKaruscDbContext>();
            karuscContext.Database.Migrate();
        }
    }
}
