using Karusc.Server.Application.Search;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Karusc.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SearchController : ControllerBase
    {
        private readonly IMediator _mediator;

        public SearchController(IMediator mediator) => _mediator = mediator;

        [HttpGet]
        public async Task<IActionResult> Search(
            [FromQuery] string text,
            [FromQuery] int resultSize,
            CancellationToken cancellationToken) => Ok(await _mediator
                .Send(new SearchQuery(text, resultSize), cancellationToken));
    }
}
