using Karusc.Server.Application.LineItemEntities.Carts.AddToCart;
using Karusc.Server.Application.LineItemEntities.Carts.GetCart;
using Karusc.Server.Application.LineItemEntities.Carts.RemoveFromCart;
using Karusc.Server.Application.LineItemEntities.Carts.UpdateLineItem;
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

        [HttpPost(nameof(AddToCart))]
        public async Task<IActionResult> AddToCart(
            [FromBody] AddToCartCommand command,
            CancellationToken cancellationToken) =>
                Ok(await _mediator.Send(command, cancellationToken));

        [HttpPost(nameof(AddLineItems))]
        public async Task<IActionResult> AddLineItems(
            [FromBody] AddLineItemsCommand command,
            CancellationToken cancellationToken) =>
                Ok(await _mediator.Send(command, cancellationToken));

        [HttpPatch]
        public async Task<IActionResult> UpdateCartLineItem(
            [FromBody] UpdateLineItemCommand command,
            CancellationToken cancellationToken) =>
                Ok(await _mediator.Send(command, cancellationToken));

        [HttpDelete("{lineItemId}")]
        public async Task<IActionResult> RemoveFromCart(
            [FromRoute] Guid lineItemId,
            CancellationToken cancellationToken) =>
                Ok(await _mediator.Send(new RemoveFromCartCommand(lineItemId), cancellationToken));
    }
}