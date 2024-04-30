using Karusc.Server.Domain.Users;

namespace Karusc.Server.Application.Addresses
{
    public record AddressDto(
        Guid Id,
        string Recipient,
        string Line1,
        string Line2,
        string City,
        string State,
        string Country,
        string Pincode,
        string Phone,
        Guid UserId)
    {
        internal AddressDto(Address address) : this(
            address.Id,
            address.Recipient,
            address.Line1,
            address.Line2,
            address.City,
            address.State,
            address.Country,
            address.Pincode,
            address.Phone,
            address.UserId)
        { }
    };
}
