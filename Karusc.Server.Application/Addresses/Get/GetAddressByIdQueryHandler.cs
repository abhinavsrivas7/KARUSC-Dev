using Karusc.Server.Application.Contracts;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Karusc.Server.Application.Addresses.Get
{
    internal sealed class GetAddressByIdQueryHandler : IRequestHandler<GetAddressByIdQuery, AddressDto>
    {
        private ICurrentUserService _currentUserService;
        private IKaruscDbContext _context;

        public GetAddressByIdQueryHandler(ICurrentUserService currentUserService, IKaruscDbContext context) =>
            (_context, _currentUserService) = (context, currentUserService);


        public async Task<AddressDto> Handle(GetAddressByIdQuery request, CancellationToken cancellationToken)
        {
            var currentUser = await _currentUserService.GetCurrentUser(cancellationToken);

            return await _context.Addresses
                .Where(address => address.UserId == currentUser.Id && address.Id == request.AddressId)
                .Select(address => new AddressDto(address))
                .AsNoTracking()
                .FirstOrDefaultAsync(cancellationToken)
                ?? throw new KeyNotFoundException("Address with the specified Id doesnt exist.");
        }
    }
}
