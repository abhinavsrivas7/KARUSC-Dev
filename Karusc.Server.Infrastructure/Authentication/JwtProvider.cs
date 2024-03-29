﻿using Karusc.Server.Application.Contracts;
using Karusc.Server.Application.Users;
using Karusc.Server.Domain.Users;
using Karusc.Server.Infrastructure.Configuration;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Karusc.Server.Infrastructure.Authentication
{
    internal sealed class JwtProvider : IJwtProvider
    {
        private readonly JwtConfiguration _configuration;
        private readonly IFileStorageService<User> _fileStorageService;

        public JwtProvider(
            IOptions<JwtConfiguration> options, 
            IFileStorageService<User> fileStorageService)
        {
            _configuration = options.Value;
            _fileStorageService = fileStorageService;
        }

        public Token GenerateToken(User user, TokenType tokenType)
        {
            DateTime expirtyTime = DateTime.UtcNow.AddHours(
                tokenType == TokenType.AccessToken 
                    ? _configuration.AccessTokenExpiryTime 
                    : _configuration.RefreshTokenExpiryTime);

            var claims = new Claim[]
            {
                new(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
                new(JwtRegisteredClaimNames.Email, user.Email),
                new(nameof(User.Id).ToLower(), user.Id.ToString()),
                new(nameof(User.Name).ToLower(), user.Name),
                new(nameof(Role).ToLower(), user.Role.ToString()),
                new(nameof(TokenType).ToLower(), tokenType.ToString()),
                new(
                    nameof(user.ProfilePictureURL).ToLower(), 
                    string.Concat(
                        _fileStorageService.EnrichmentPrefix, 
                        user.ProfilePictureURL))
            };

            var signingCredentials = new SigningCredentials(
                new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration.SecretKey)),
                SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                _configuration.Issuer,
                _configuration.Audience,
                claims,
                null,
                expirtyTime,
                signingCredentials);

            string tokenValue = new JwtSecurityTokenHandler().WriteToken(token);
            return new(tokenType.ToString(), tokenValue, expirtyTime);
        }
    }
}
