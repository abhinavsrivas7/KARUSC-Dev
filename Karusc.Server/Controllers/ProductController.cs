using Karusc.Server.Application.Products.Create;
using Karusc.Server.Application.Products.Get;
using Karusc.Server.Application.Products.GetById;
using Karusc.Server.Domain;
using Karusc.Server.Infrastructure.Configuration;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace Karusc.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly BunnyFileStorage _bunnyConfig;
        public ProductController(IMediator mediator, IOptions<BunnyFileStorage> options) => 
            (_mediator, _bunnyConfig) = (mediator, options.Value);

        [HttpGet]
        public async Task<IActionResult> Get(
            [FromQuery] int pageSize,
            [FromQuery] int pageNumber,
            CancellationToken cancellationToken) => Ok(await _mediator
                .Send(new GetProductsQuery(pageSize, pageNumber), cancellationToken));

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

        [HttpGet(nameof(GetConfig))]
        public IActionResult GetConfig() => Ok(_bunnyConfig);
    }
}