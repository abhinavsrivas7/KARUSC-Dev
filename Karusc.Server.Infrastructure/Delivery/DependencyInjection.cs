using Karusc.Server.Application.Contracts;
using Karusc.Server.Infrastructure.Configuration;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Polly;
using Polly.Contrib.WaitAndRetry;

namespace Karusc.Server.Infrastructure.Delivery
{
    internal static class DependencyInjection
    {
        internal static void AddDelivery(this IServiceCollection services, IConfiguration configuration) 
        {
            var deliveryConfig = configuration.GetSection(nameof(ShipRocketConfiguration));
            services.Configure<ShipRocketConfiguration>(deliveryConfig);
            services.AddSingleton<IDeliveryService, ShipRocketDeliveryService>();

            services
                .AddHttpClient(nameof(ShipRocketDeliveryService), client =>
                {
                    client.BaseAddress = new Uri(deliveryConfig.Get<ShipRocketConfiguration>()!.ApiUrl);
                    client.DefaultRequestHeaders.Add("Content-Type", "application/json");
                })
                .AddTransientHttpErrorPolicy(policyBuilder => policyBuilder.WaitAndRetryAsync(
                    Backoff.DecorrelatedJitterBackoffV2(TimeSpan.FromSeconds(1), 5)));
        }
    }
}
