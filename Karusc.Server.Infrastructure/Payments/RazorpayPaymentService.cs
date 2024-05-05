using Karusc.Server.Application.Contracts;
using Karusc.Server.Infrastructure.Configuration;
using Microsoft.Extensions.Options;
using Razorpay.Api;

namespace Karusc.Server.Infrastructure.Payments
{
    internal class RazorpayPaymentService : IPaymentService
    {
        private readonly RazorpayClient _client;

        public RazorpayPaymentService(IOptions<RazorpayConfiguration> options)
        {
            _client = new(options.Value.AccessKey, options.Value.SecretKey);
        }
    }
}
