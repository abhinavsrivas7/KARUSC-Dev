using Karusc.Server.Application.Contracts;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Karusc.Server.Application.Addresses.Delete
{
    internal sealed class DeleteAddressCommandHandler : IRequestHandler<DeleteAddressCommand, AddressDto>
    {
        private ICurrentUserService _currentUserService;
        private IKaruscDbContext _context;

        public DeleteAddressCommandHandler(ICurrentUserService currentUserService, IKaruscDbContext context) =>
            (_context, _currentUserService) = (context, currentUserService);

        public async Task<AddressDto> Handle(DeleteAddressCommand request, CancellationToken cancellationToken)
        {
            var currentUser = await _currentUserService.GetCurrentUser(cancellationToken);

            var address = await _context.Addresses
                .FirstOrDefaultAsync(
                    address => address.UserId == currentUser.Id && address.Id == request.AddressId, 
                    cancellationToken)
                ?? throw new KeyNotFoundException("Address with the specified Id doesnt exist.");

            _context.Addresses.Remove(address);
            await _context.SaveChangesAsync(cancellationToken);
            return new AddressDto(address);
        }
    }
}
