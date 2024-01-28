using Karusc.Server.Application.Categories.Create;
using Karusc.Server.Application.Categories.Delete;
using Karusc.Server.Application.Categories.Get;
using Karusc.Server.Application.Categories.GetById;
using Karusc.Server.Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Karusc.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly IMediator _mediator;
        public CategoryController(IMediator mediator) => _mediator = mediator;

        [HttpGet]
        public async Task<IActionResult> Get(
            [FromQuery] int pageSize,
            [FromQuery] int pageNumber,
            CancellationToken cancellationToken) => Ok(await _mediator
                .Send(new GetCategoriesQuery(pageSize, pageNumber), cancellationToken));

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(
            [FromRoute] Guid id,
            CancellationToken cancellationToken) => Ok(await _mediator
                .Send(new GetCategoryByIdQuery(id), cancellationToken));

        [HttpPost]
        public async Task<IActionResult> Create(
            [FromBody] CreateCategoryCommand command,
            CancellationToken cancellationToken) => Created(
                $"/api/{nameof(Category)}/{{id}}",
                await _mediator.Send(command, cancellationToken));

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(
            [FromRoute] Guid id,
            CancellationToken cancellationToken) => Ok(await _mediator
                .Send(new DeleteCategoryCommand(id), cancellationToken));
    }
}
