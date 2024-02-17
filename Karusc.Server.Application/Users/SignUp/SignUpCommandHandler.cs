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
            IFileStorageService<User> fileStorageService)
        {
            _context = context;
            _fileStorageService = fileStorageService;
        }

        public async Task<UserDto> Handle(SignUpCommand command, CancellationToken cancellationToken)
        {
            var user = User.Create(
                command.Email,
                command.Password.HashPassword(),
                command.Role,
                command.ProfilePicture);

            if (!string.IsNullOrEmpty(user.ProfilePictureURL) && user.ProfilePicture is not null)
            {
                user.ProfilePictureURL = await _fileStorageService
                    .Upload(user.ProfilePicture, cancellationToken);
            }
            
            await _context.Users.AddAsync(user, cancellationToken);
            await _context.SaveChangesAsync(cancellationToken);

            return new UserDto(
                user.Id, 
                user.Email, 
                string.IsNullOrEmpty(_fileStorageService.EnrichmentPrefix) 
                    ? user.ProfilePictureURL
                    : string.IsNullOrEmpty(user.ProfilePictureURL) 
                    ? user.ProfilePictureURL
                    : string.Concat(_fileStorageService.EnrichmentPrefix, user.ProfilePictureURL));
        }
    }
}