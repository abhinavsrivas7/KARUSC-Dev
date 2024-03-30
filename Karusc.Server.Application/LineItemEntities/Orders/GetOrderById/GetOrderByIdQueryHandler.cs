using Karusc.Server.Application.Contracts;
using Karusc.Server.Domain.Products;
using MediatR;

namespace Karusc.Server.Application.LineItemEntities.Orders.GetOrderById
{
    internal sealed class GetOrderByIdQueryHandler : OrderRequestHandler, IRequestHandler<GetOrderByIdQuery, OrderDto>
    {
        public GetOrderByIdQueryHandler(
            IKaruscDbContext context, 
            ICurrentUserService currentUserService,
            IFileStorageService<Product> fileStorageService) 
            : base(context, currentUserService, fileStorageService.EnrichmentPrefix) { }

        public async Task<OrderDto> Handle(GetOrderByIdQuery request, CancellationToken cancellationToken) => 
            await HandleOrderOperationAsync(null, cancellationToken);
    }
}
