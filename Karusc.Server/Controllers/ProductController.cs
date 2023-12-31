using Karusc.Server.Application.Products.GetAllProducts;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Karusc.Server.Controllers
{
    [Route("api/[controller]")]
    public class ProductController : ControllerBase
    {
        private readonly IMediator _mediator;

        public ProductController(IMediator mediator) => _mediator = mediator;

        [HttpGet]
        public async Task<IActionResult> Get(int pageSize = 0, int pageNumber = 0) => 
            Ok(await _mediator.Send(new GetAllProductsRequest(pageSize, pageNumber)));
    }
}
