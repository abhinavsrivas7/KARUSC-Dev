using Karusc.Server.Domain.Users;

namespace Karusc.Server.Application.Users
{
    internal record AddressDto(
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
        internal AddressDto(Address address): this(
            address.Recipient,
            address.Line1,
            address.Line2,
            address.City,
            address.State,
            address.Country,
            address.Pincode,
            address.Phone,
            address.UserId) { }
    };
}
