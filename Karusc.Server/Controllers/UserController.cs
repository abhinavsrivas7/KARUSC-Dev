using Karusc.Server.Application.Users.Login;
using Karusc.Server.Application.Users.SignUp;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Karusc.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IMediator _mediator;
        public UserController(IMediator mediator) => _mediator = mediator;

 
        [HttpPost("login")]
        public async Task<IActionResult> LoginUser([FromBody] LoginCommand command,
        CancellationToken cancellationToken = default) => Ok(await _mediator.Send(
        command, cancellationToken));

        [HttpPost("signUp")]
        public async Task<IActionResult> SignUpUser([FromBody] SignUpCommand command,
                                                CancellationToken cancellationToken = default) => Ok(await _mediator.Send(
                command, cancellationToken));   
    }
}
