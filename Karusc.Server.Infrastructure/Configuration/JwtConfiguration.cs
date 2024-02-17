namespace Karusc.Server.Infrastructure.Configuration
{
    public class JwtConfiguration
    {
        public string Issuer { get; set; } = string.Empty;

        public string Audience { get; set; } = string.Empty;    

        public string SecretKey { get; set; } = string.Empty;

        public int AccessTokenExpiryTime { get; set; }

        public int RefreshTokenExpiryTime { get; set; }
    }
}
