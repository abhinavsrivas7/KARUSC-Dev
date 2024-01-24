using Karusc.Server.Application.Contracts;
using Microsoft.Extensions.DependencyInjection;

namespace Karusc.Server.Infrastructure.FileStorage
{
    internal static class DependencyInjection
    {
        private const string _localEnvironmentName = "Local";
        internal static void AddFileStorage(this IServiceCollection services, string environment)
        {
            services.AddScoped(typeof(IFileStorageService<>), environment switch
            {
                _localEnvironmentName => typeof(LocalFileStorageService<>),
                _ => typeof(AzureFileService<>)
            });
        }
    }
}
