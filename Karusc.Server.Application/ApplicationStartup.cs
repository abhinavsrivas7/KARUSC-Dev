using Microsoft.Extensions.DependencyInjection;
using System.Reflection;

namespace Karusc.Server.Application
{
    public static class ApplicationStartup
    {
        public static void AddApplication(this IServiceCollection services) => services
            .AddMediatR(configuration => configuration.RegisterServicesFromAssembly(Assembly.GetExecutingAssembly()));
    }
}
