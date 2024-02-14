namespace Karusc.Server.Application.Users
{
    public record Token(
        string TokenType, 
        string TokenValue,
        DateTime TokenExpiryTime);
}
