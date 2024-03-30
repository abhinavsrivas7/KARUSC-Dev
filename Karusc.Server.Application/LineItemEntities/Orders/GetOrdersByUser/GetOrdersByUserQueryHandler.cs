using Karusc.Server.Application.Contracts;
using Karusc.Server.Domain.Products;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Karusc.Server.Application.LineItemEntities.Orders.GetOrdersByUser
{
    internal sealed class GetOrdersByUserQueryHandler : OrderRequestHandler,
        IRequestHandler<GetOrdersByUserQuery, List<OrderDto>>
    {
        public GetOrdersByUserQueryHandler(
            IKaruscDbContext context, 
            ICurrentUserService currentUserService,
            IFileStorageService<Product> fileStorageService) 
            : base(context, currentUserService, fileStorageService.EnrichmentPrefix) { }

        public async Task<List<OrderDto>> Handle(GetOrdersByUserQuery request, CancellationToken cancellationToken)
        {
            var currentUser = await _currentUserService.GetCurrentUser(cancellationToken);
            
            List<OrderDto> orders = new List<OrderDto>();

            (await GetLineItemQueryable()
                .Where(order => order.OwnerId == currentUser.Id)
                .ToListAsync())
                .Select(async order => orders
                    .Add(await HandleOrderOperationAsync(
                        null,
                        cancellationToken,
                        () => order,
                        false)));

            return orders;
        }
    }
}
