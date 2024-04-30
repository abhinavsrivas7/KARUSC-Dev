using MediatR;

namespace Karusc.Server.Application.Addresses.GetAll
{
    public record GetAllAddressesQuery : IRequest<List<AddressDto>>;
}
