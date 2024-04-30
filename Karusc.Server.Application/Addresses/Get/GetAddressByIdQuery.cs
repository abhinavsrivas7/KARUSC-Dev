using MediatR;

namespace Karusc.Server.Application.Addresses.Get
{
    public record GetAddressByIdQuery(Guid AddressId) : IRequest<AddressDto>;
}
