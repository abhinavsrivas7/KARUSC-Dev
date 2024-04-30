using Karusc.Server.Application.Contracts;
using Karusc.Server.Domain.Users;
using MediatR;

namespace Karusc.Server.Application.Addresses.Add
{
    internal sealed class AddAddressCommandHandler : IRequestHandler<AddAddressCommand, AddressDto>
    {
        private ICurrentUserService _currentUserService;
        private IKaruscDbContext _context;

        public AddAddressCommandHandler(ICurrentUserService currentUserService, IKaruscDbContext context) =>
            (_context, _currentUserService) = (context, currentUserService);

        public async Task<AddressDto> Handle(AddAddressCommand request, CancellationToken cancellationToken)
        {
            var currentUser = await _currentUserService.GetCurrentUser(cancellationToken);

            var address = Address.Create(
                request.Recipient,
                request.Line1,
                request.Line2,
                request.City,
                request.State,
                request.Country,
                request.Pincode,
                request.Phone,
                currentUser);

            await _context.Addresses.AddAsync(address, cancellationToken);
            await _context.SaveChangesAsync(cancellationToken);
            return new AddressDto(address);
        }
    }
}
