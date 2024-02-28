using Karusc.Server.Application.Contracts;
using Karusc.Server.Domain.Users;
using MediatR;

namespace Karusc.Server.Application.Users.SignUp
{
    internal sealed class SignUpCommandHandler : IRequestHandler<SignUpCommand, UserDto>
    {
        private readonly IKaruscDbContext _context;
        private readonly IFileStorageService<User> _fileStorageService;

        public SignUpCommandHandler(
            IKaruscDbContext context, 
            IFileStorageService<User> fileStorageService) =>
            (_context, _fileStorageService) = (context, fileStorageService);

        public async Task<UserDto> Handle(
            SignUpCommand command,
            CancellationToken cancellationToken) => await command
            .SaveUser(_fileStorageService, _context, cancellationToken);
    }
}