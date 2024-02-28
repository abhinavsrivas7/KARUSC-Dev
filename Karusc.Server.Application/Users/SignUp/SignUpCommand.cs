using Karusc.Server.Domain.Users;
using MediatR;
using System.Text.Json.Serialization;

namespace Karusc.Server.Application.Users.SignUp
{
    public record SignUpCommand(
        string Email,
        string Name,
        string Password,
        string ProfilePicture) : CreateUserCommand(Email, Name, Password, ProfilePicture)
    {
        [JsonIgnore]
        public override Role Role {  get => Role.Customer; }
    }
}