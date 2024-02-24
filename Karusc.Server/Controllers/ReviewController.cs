using Karusc.Server.Application.Reviews.Create;
using Karusc.Server.Application.Reviews.Delete;
using Karusc.Server.Application.Reviews.Get;
using Karusc.Server.Domain.Users;
using Karusc.Server.Infrastructure.Authentication;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Karusc.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReviewController : ControllerBase
    {
        private readonly IMediator _mediator;
        public ReviewController (IMediator mediator) => _mediator = mediator;

        [HttpGet]
        public async Task<IActionResult> Get(
            [FromQuery] int pageSize,
            [FromQuery] int pageNumber,
            CancellationToken cancellationToken) => Ok(await _mediator
                .Send(new GetReviewsQuery(pageSize, pageNumber), cancellationToken));

        [HasRole(Role.Customer)]
        [HttpPost]
        public async Task<IActionResult> Create(
            [FromBody] CreateReviewCommand command,
            CancellationToken cancellationToken) => Ok(
                await _mediator.Send(command, cancellationToken));

        [HasRole(Role.Customer)]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(
            [FromRoute] Guid id,
            CancellationToken cancellationToken) => Ok(
                await _mediator.Send(new DeleteReviewCommand(id), cancellationToken));
    }
}