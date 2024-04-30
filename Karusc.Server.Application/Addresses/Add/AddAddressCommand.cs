using MediatR;

namespace Karusc.Server.Application.Addresses.Add
{
    public record AddAddressCommand(
        string Recipient,
        string Line1,
        string Line2,
        string City,
        string State,
        string Country,
        string Pincode,
        string Phone) : IRequest<AddressDto>;
}
