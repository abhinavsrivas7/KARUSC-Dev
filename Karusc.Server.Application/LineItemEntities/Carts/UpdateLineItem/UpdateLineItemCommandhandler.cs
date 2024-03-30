using Karusc.Server.Application.Contracts;
using Karusc.Server.Domain.Products;
using MediatR;

namespace Karusc.Server.Application.LineItemEntities.Carts.UpdateLineItem
{
    internal sealed class UpdateLineItemCommandhandler
        : CartRequestHandler, IRequestHandler<UpdateLineItemCommand, CartDto>
    {
        public UpdateLineItemCommandhandler(
            ICurrentUserService currentUserService,
            IKaruscDbContext context,
            IFileStorageService<Product> fileStorageService)
        : base(currentUserService, context, fileStorageService.EnrichmentPrefix) { }

        public async Task<CartDto> Handle(
            UpdateLineItemCommand request,
            CancellationToken cancellationToken) => await HandleCartOperationAsync(
                cart => cart.ChangeLineItemQuantity(request.LineItemId, request.IncrementQuantity),
                cancellationToken);
    }
}