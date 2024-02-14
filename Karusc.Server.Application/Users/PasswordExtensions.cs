using System.Security.Cryptography;
using System.Text;

namespace Karusc.Server.Application.Users
{
    internal static class PasswordExtensions
    {
        internal static string HashPassword(this string password) => SHA256
            .HashData(Encoding.UTF8.GetBytes(password))
            .Aggregate(
                new StringBuilder(), 
                (hashedPassword, hashByte) => hashedPassword.Append(hashByte.ToString("X2")))
            .ToString();
    }
}
