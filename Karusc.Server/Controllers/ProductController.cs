using Karusc.Server.Application.Products.Create;
using Karusc.Server.Application.Products.Get;
using Karusc.Server.Application.Products.GetById;
using Karusc.Server.Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Karusc.Server.Controllers
{
    [Route("api/[controller]")]
    public class ProductController : ControllerBase
    {
        private readonly IMediator _mediator;

        public ProductController(IMediator mediator) => _mediator = mediator;

        [HttpGet(nameof(Get))]
        public async Task<IResult> Get(
            [FromQuery] int pageSize,
            [FromQuery] int pageNumber,
            CancellationToken cancellationToken) =>
            Results.Ok(await _mediator.Send(new GetProductsQuery(pageSize, pageNumber), cancellationToken));

        [HttpGet(nameof(GetById))]
        public async Task<IResult> GetById([FromQuery] Guid id, CancellationToken cancellationToken) =>
            Results.Ok(await _mediator.Send(new GetProductByIdQuery(id), cancellationToken));

        [HttpPost(nameof(Create))]
        public async Task<IResult> Create(
            [FromBody] CreateProductCommand command,
            CancellationToken cancellationToken)
        {
            var createdProduct = await _mediator.Send(command, cancellationToken);
            return Results.Created($"/api/product/{createdProduct.Id}", createdProduct);
        }
    }
}
