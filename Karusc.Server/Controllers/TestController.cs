using Karusc.Server.Application.Test;
using Karusc.Server.Domain.Products;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Karusc.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestController : ControllerBase
    {
        private readonly IMediator _mediator;
        public TestController(IMediator mediator) => _mediator = mediator;

        [HttpPost]
        public async Task<IActionResult> Create(
            [FromBody] CreateBulkProductCommand command,
            CancellationToken cancellationToken) => Created(
                "Created",
                await _mediator.Send(command, cancellationToken));

    }
}