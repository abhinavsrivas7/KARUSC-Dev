using Karusc.Server.Application.HomeCarousel.BulkCreate;
using Karusc.Server.Application.HomeCarousel.Create;
using Karusc.Server.Application.HomeCarousel.Delete;
using Karusc.Server.Application.HomeCarousel.Get;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Karusc.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HomeCarouselImageController : ControllerBase
    {
        private readonly IMediator _mediator;
        public HomeCarouselImageController(IMediator mediator) => _mediator = mediator;

        [HttpGet]
        public async Task<IActionResult> Get(CancellationToken cancellationToken) => Ok(
            await _mediator.Send(new GetHomeCarouselImagesQuery(), cancellationToken));

        [HttpPost]
        public async Task<IActionResult> Create(
            [FromBody] CreateHomeCarouselImageCommand command,
            CancellationToken cancellationToken) => 
                Created(string.Empty, await _mediator.Send(command, cancellationToken));

        [HttpPost(nameof(BulkCreate))]
        public async Task<IActionResult> BulkCreate(
            [FromBody] BulkCreateHomeCarouselImagesCommand command,
            CancellationToken cancellationToken) => Ok(await _mediator
                .Send(command, cancellationToken));

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(
            [FromRoute] Guid id, CancellationToken cancellationToken) => Ok(await _mediator
                .Send(new DeleteHomeCarouselImageCommand(id), cancellationToken));
    }
}
