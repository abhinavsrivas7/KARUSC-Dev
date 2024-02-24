using Karusc.Server.Application.Contracts;
using Karusc.Server.Domain.Users;
using MediatR;

namespace Karusc.Server.Application.Users.CreateAdminUser
{
    internal class CreateAdminUserCommandHandler : IRequestHandler<CreateAdminUserCommand, UserDto>
    {
        private IKaruscDbContext _context;
        private readonly IFileStorageService<User> _fileStorageService;

        public CreateAdminUserCommandHandler(
            IKaruscDbContext context,
            IFileStorageService<User> fileStorageService) => 
            (_context, _fileStorageService) = (context, fileStorageService);

        public async Task<UserDto> Handle(
            CreateAdminUserCommand command, 
            CancellationToken cancellationToken) => await command
            .SaveUser(_fileStorageService, _context, cancellationToken);
    }
}
