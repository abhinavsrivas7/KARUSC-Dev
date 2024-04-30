using MediatR;

namespace Karusc.Server.Application.Addresses.Update
{
    public record UpdateAddressCommand(
        Guid Id,
        string Recipient,
        string Line1,
        string Line2,
        string City,
        string State,
        string Country,
        string Pincode,
        string Phone) : IRequest<AddressDto>;
}
