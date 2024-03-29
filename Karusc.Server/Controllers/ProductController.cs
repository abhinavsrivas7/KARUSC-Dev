using Karusc.Server.Application.Products.Create;
using Karusc.Server.Application.Products.Delete;
using Karusc.Server.Application.Products.Get;
using Karusc.Server.Application.Products.GetById;
using Karusc.Server.Domain.Products;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Karusc.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IMediator _mediator;
        public ProductController(IMediator mediator) => _mediator = mediator;

        [HttpGet(nameof(Get))]
        public async Task<IActionResult> Get(
            [FromQuery] Guid[] categories,
            [FromQuery] Guid[] collections,
            [FromQuery] int pageSize = 100,
            [FromQuery] int pageNumber = 0,
            CancellationToken cancellationToken = default) => Ok(await _mediator.Send(
                new GetProductsQuery(
                    pageSize, 
                    pageNumber, 
                    categories.ToHashSet(), 
                    collections.ToHashSet()),
                cancellationToken));

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(
            [FromRoute] Guid id, 
            CancellationToken cancellationToken) => Ok(await _mediator
                .Send(new GetProductByIdQuery(id), cancellationToken));

        [HttpPost]
        public async Task<IActionResult> Create(
            [FromBody] CreateProductCommand command,
            CancellationToken cancellationToken) => Created(
                $"/api/{nameof(Product)}/{{id}}",
                await _mediator.Send(command, cancellationToken));

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(
            [FromRoute] Guid id,
            CancellationToken cancellationToken) => Ok(await _mediator
                .Send(new DeleteProductCommand(id), cancellationToken));
    }
}