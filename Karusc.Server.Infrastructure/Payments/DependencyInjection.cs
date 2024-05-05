using Karusc.Server.Application.Contracts;
using Karusc.Server.Infrastructure.Configuration;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Karusc.Server.Infrastructure.Payments
{
    internal static class DependencyInjection
    {
        internal static void AddPayments(this IServiceCollection services, IConfiguration configuration)
        {
            services.Configure<RazorpayConfiguration>(configuration.GetSection(nameof(RazorpayConfiguration)));
            services.AddScoped<IPaymentService, RazorpayPaymentService>();
        }
    }
}
