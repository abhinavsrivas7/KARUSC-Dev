using Karusc.Server.Application.Addresses.Add;
using Karusc.Server.Application.Addresses.Delete;
using Karusc.Server.Application.Addresses.Get;
using Karusc.Server.Application.Addresses.GetAll;
using Karusc.Server.Application.Addresses.Update;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Karusc.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AddressController : ControllerBase
    {
        private readonly IMediator _mediator;

        public AddressController(IMediator mediator) => _mediator = mediator;

        [HttpGet(nameof(GetAll))]
        public async Task<IActionResult> GetAll(CancellationToken cancellationToken) => Ok(
            await _mediator.Send(new GetAllAddressesQuery(), cancellationToken));

        [HttpGet(nameof(GetById))]
        public async Task<IActionResult> GetById(
            [FromQuery] Guid addressId, 
            CancellationToken cancellationToken) => Ok(
            await _mediator.Send(new GetAddressByIdQuery(addressId), cancellationToken));

        [HttpPost]
        public async Task<IActionResult> Add(
            [FromBody] AddAddressCommand command, 
            CancellationToken cancellationToken) => Ok(
            await _mediator.Send(command, cancellationToken));

        [HttpPatch]
        public async Task<IActionResult> Update(
            [FromBody] UpdateAddressCommand command,
            CancellationToken cancellationToken) => Ok(
            await _mediator.Send(command, cancellationToken));

        [HttpDelete("{addressId}")]
        public async Task<IActionResult> Delete(
            [FromRoute] Guid addressId,
            CancellationToken cancellationToken) => Ok(
            await _mediator.Send(new DeleteAddressCommand(addressId), cancellationToken));
    }
}
