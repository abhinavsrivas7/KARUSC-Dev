using Karusc.Server.Application.Contracts;
using Karusc.Server.Domain.LineItemEntities;
using Microsoft.EntityFrameworkCore;

namespace Karusc.Server.Application.LineItemEntities.Orders
{
    internal abstract class OrderRequestHandler : LineItemRequesthandler<Order>
    {
        private readonly string? _enrichmentPrefix;

        protected OrderRequestHandler(
            IKaruscDbContext context,
            ICurrentUserService currentUserService,
            string? enrichmentPrefix) : base(context, currentUserService) => 
            _enrichmentPrefix = enrichmentPrefix;

        protected async Task<OrderDto> HandleOrderOperationAsync(
            Action<Order>? operation,
            CancellationToken cancellationToken,
            Func<Order>? createEntity = null,
            bool saveCreatedEntity = true) => new OrderDto(
                await HandleLineItemEntityOperationAsync(operation, cancellationToken, createEntity, saveCreatedEntity))
                .EnrichLineItems(_enrichmentPrefix);

        protected override IQueryable<Order> GetLineItemQueryable() => _context.Orders
            .Include(order => order.LineItems)
            .ThenInclude(lineItem => lineItem.Product)
            .ThenInclude(product => product.Images);

        protected override async Task<Order> SaveEntity(Order entity, CancellationToken cancellationToken)
        {
            await _context.Orders.AddAsync(entity, cancellationToken);
            await _context.SaveChangesAsync(cancellationToken);
            return entity;
        }
    }
}
