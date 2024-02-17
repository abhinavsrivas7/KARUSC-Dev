using Karusc.Server.Application.Contracts;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Karusc.Server.Application.Users.Login
{
    internal sealed class SignupCommandHandler
        : IRequestHandler<LoginCommand, List<Token>>
    {
        private readonly IKaruscDbContext _context;
        private readonly IJwtProvider _jwtProvider;

        public SignupCommandHandler(IKaruscDbContext context, IJwtProvider jwtProvider) =>
            (_context, _jwtProvider) = (context, jwtProvider);

        public async Task<List<Token>> Handle(LoginCommand command, CancellationToken cancellationToken)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(user => user.Email.Equals(command.Email), cancellationToken)
                ?? throw new KeyNotFoundException(command.Email);

            return user.PasswordHash.Equals(command.Password.HashPassword())
                ? new() 
                { 
                    _jwtProvider.GenerateAccessToken(user), 
                    _jwtProvider.GenerateRefreshToken(user) 
                }
                : throw new ArgumentException("Invalid Credentials");
        }
    }
}