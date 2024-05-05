using Karusc.Server.Application.External.Delivery.ShipRocket;

namespace Karusc.Server.Application.Contracts
{
    public interface IDeliveryService
    {
        Task<string> GenerateToken(CancellationToken cancellationToken);
        Task<ServiceabilityResponse> CheckServiceability(int sourcePincode, int destinationPincode, CancellationToken cancellationToken);
        Task<ShipmentResponse> CreateShipment(ShipmentRequest request, CancellationToken cancellationToken);
        Task<PickupResponse> SchedulePickup(PickupRequest request, CancellationToken cancellationToken);
        Task<float> CheckWalletBalance(CancellationToken cancellationToken);
        Task<string> CheckShipmentStatus(int id, CancellationToken cancellationToken);
    }
}
