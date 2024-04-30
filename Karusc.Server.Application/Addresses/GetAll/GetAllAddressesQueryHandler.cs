using Karusc.Server.Application.Contracts;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Karusc.Server.Application.Addresses.GetAll
{
    internal sealed class GetAllAddressesQueryHandler : IRequestHandler<GetAllAddressesQuery, List<AddressDto>>
    {
        private ICurrentUserService _currentUserService;
        private IKaruscDbContext _context;

        public GetAllAddressesQueryHandler(ICurrentUserService currentUserService, IKaruscDbContext context) =>
            (_context, _currentUserService) = (context, currentUserService);

        public async Task<List<AddressDto>> Handle(GetAllAddressesQuery request, CancellationToken cancellationToken)
        {
            var currentUser = await _currentUserService.GetCurrentUser(cancellationToken);

            return await _context.Addresses
                .Where(address => address.UserId == currentUser.Id)
                .Select(address => new AddressDto(address))
                .AsNoTracking()
                .ToListAsync(cancellationToken);
        }
    }
}
