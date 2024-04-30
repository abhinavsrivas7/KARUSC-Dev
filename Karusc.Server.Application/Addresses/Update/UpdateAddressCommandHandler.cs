using Karusc.Server.Application.Contracts;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics.Metrics;
using System.Numerics;

namespace Karusc.Server.Application.Addresses.Update
{
    internal sealed class UpdateAddressCommandHandler : IRequestHandler<UpdateAddressCommand, AddressDto>
    {
        private ICurrentUserService _currentUserService;
        private IKaruscDbContext _context;

        public UpdateAddressCommandHandler(ICurrentUserService currentUserService, IKaruscDbContext context) =>
            (_context, _currentUserService) = (context, currentUserService);

        public async Task<AddressDto> Handle(UpdateAddressCommand request, CancellationToken cancellationToken)
        {
            var currentUser = await _currentUserService.GetCurrentUser(cancellationToken);

            var address = await _context.Addresses
                .FirstOrDefaultAsync(
                    address => address.UserId == currentUser.Id && address.Id == request.Id, 
                    cancellationToken)
                ?? throw new KeyNotFoundException("Address with the specified Id doesnt exist.");

            address.Update(
                request.Recipient,
                request.Line1,
                request.Line2,
                request.City,
                request.State,
                request.Country,
                request.Pincode,
                request.Phone);

            await _context.SaveChangesAsync(cancellationToken);
            return new AddressDto(address);
        }
    }
}
