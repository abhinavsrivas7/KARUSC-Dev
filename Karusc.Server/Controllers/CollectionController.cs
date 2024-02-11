using Karusc.Server.Application.Categories.Create;
using Karusc.Server.Application.Categories.Delete;
using Karusc.Server.Application.Categories.Get;
using Karusc.Server.Application.Categories.GetById;
using Karusc.Server.Application.Collections.Create;
using Karusc.Server.Application.Collections.Delete;
using Karusc.Server.Application.Collections.Get;
using Karusc.Server.Application.Collections.GetById;
using Karusc.Server.Domain.Product;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Karusc.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CollectionController : ControllerBase
    {
        private readonly IMediator _mediator;

        public CollectionController(IMediator mediator) => _mediator = mediator;

        [HttpGet]
        public async Task<IActionResult> Get(
            [FromQuery] int pageSize,
            [FromQuery] int pageNumber,
            CancellationToken cancellationToken) => Ok(await _mediator
                .Send(new GetCollectionsQuery(pageSize, pageNumber), cancellationToken));

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(
            [FromRoute] Guid id,
            CancellationToken cancellationToken) => Ok(await _mediator
                .Send(new GetCollectionByIdQuery(id), cancellationToken));

        [HttpPost]
        public async Task<IActionResult> Create(
            [FromBody] CreateCollectionCommand command,
            CancellationToken cancellationToken) => Created(
                $"/api/{nameof(Collection)}/{{id}}",
                await _mediator.Send(command, cancellationToken));

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(
            [FromRoute] Guid id,
            CancellationToken cancellationToken) => Ok(await _mediator
                .Send(new DeleteCollectionCommand(id), cancellationToken));
    }
}
