using Karusc.Server.Application.Contracts;
using Karusc.Server.Domain.LineItemEntities;
using Karusc.Server.Domain.Products;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Karusc.Server.Application.LineItemEntities.Orders.CreateOrder
{
    internal sealed class CreateOrderFromLineItemCommandHandler : CreateOrderCommandHandler,
        IRequestHandler<CreateOrderFromLineItemCommand, OrderDto>
    {
        public CreateOrderFromLineItemCommandHandler(
            IKaruscDbContext context, 
            ICurrentUserService currentUserService,
            IFileStorageService<Product> fileStorageService) 
            : base(context, currentUserService, fileStorageService.EnrichmentPrefix) { }

        public async Task<OrderDto> Handle(
            CreateOrderFromLineItemCommand request, CancellationToken cancellationToken)
        {
            var order = await CreateOrder(request.AddressId, cancellationToken);

            var product = await _context.Products
                .Include(product => product.Images)
                .FirstOrDefaultAsync(product => product.Id == request.ProductId, cancellationToken)
                ?? throw new KeyNotFoundException("Product with the specified ID doesnt exist.");

            return await HandleOrderOperationAsync(
                null, 
                cancellationToken, 
                () => order.AddLineItem(product, request.Quantity));
        }
    }
}
