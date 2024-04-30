using MediatR;

namespace Karusc.Server.Application.Addresses.Delete
{
    public record DeleteAddressCommand(Guid AddressId) : IRequest<AddressDto>;
}
