using Karusc.Server.Application.Carts.AddToCart;
using Karusc.Server.Application.Carts.GetCart;
using Karusc.Server.Application.Carts.UpdateLineItem;
using Karusc.Server.Domain.Users;
using Karusc.Server.Infrastructure.Authentication;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Karusc.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [HasRole(Role.Customer)]
    public class CartController : ControllerBase
    {
        private readonly IMediator _mediator;

        public CartController(IMediator mediator) => _mediator = mediator;

        [HttpGet]
        public async Task<IActionResult> Get(CancellationToken cancellationToken) =>
            Ok(await _mediator.Send(new GetCartQuery(), cancellationToken));

        [HttpPost]
        public async Task<IActionResult> AddToCart(
            [FromBody] AddToCartCommand command,
            CancellationToken cancellationToken) =>
                Ok(await _mediator.Send(command, cancellationToken));

        [HttpPatch]
        public async Task<IActionResult> UpdateCartLineItem(
            [FromBody] UpdateLineItemCommand command,
            CancellationToken cancellationToken) =>
                Ok(await _mediator.Send(command, cancellationToken));

        [HttpDelete]
        public async Task<IActionResult> RemoveFromCart(
            [FromBody] AddToCartCommand command,
            CancellationToken cancellationToken) =>
                Ok(await _mediator.Send(command, cancellationToken));
    }
}