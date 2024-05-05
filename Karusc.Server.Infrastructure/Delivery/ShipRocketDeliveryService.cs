using Karusc.Server.Application.Contracts;
using Karusc.Server.Application.External.Delivery.ShipRocket;
using Karusc.Server.Infrastructure.Configuration;
using Microsoft.Extensions.Options;
using System.Net.Http.Json;
using System.Text.Json;

namespace Karusc.Server.Infrastructure.Delivery
{
    internal class ShipRocketDeliveryService : IDeliveryService
    {
        private string? _token = null;
        private DateTime? _tokenExpiration = null;
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly string _userName, _password;

        public ShipRocketDeliveryService(IHttpClientFactory httpClientFactory, IOptions<ShipRocketConfiguration> options)
        {
            _httpClientFactory = httpClientFactory;
            _userName = options.Value.Username;
            _password = options.Value.Password;
        }

        public Task<ServiceabilityResponse> CheckServiceability(int sourcePincode, int destinationPincode, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<string> CheckShipmentStatus(int id, CancellationToken cancellationToken)
        {
            //call get all shipment details endpoint with filter for id field to get string status values
            throw new NotImplementedException();
        }

        public Task<float> CheckWalletBalance(CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<ShipmentResponse> CreateShipment(ShipmentRequest request, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<PickupResponse> SchedulePickup(PickupRequest request, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public async Task<string> GenerateToken(CancellationToken cancellationToken)
        {
            if (string.IsNullOrEmpty(_token) || !_tokenExpiration.HasValue || _tokenExpiration.Value < DateTime.UtcNow)
            {
                var client = _httpClientFactory.CreateClient(nameof(ShipRocketDeliveryService));
                var request = new TokenRequest(_userName, _password);
                var reponse = await client.PostAsJsonAsync<TokenRequest>("auth/login", request, cancellationToken);
                _token = await reponse.Content.ReadAsStringAsync(cancellationToken);
                _tokenExpiration = DateTime.UtcNow.AddDays(10).AddMinutes(-10);
            }

            return _token;
        }
    }
}
