using Karusc.Server.Application.Contracts;
using Karusc.Server.Domain.Products;
using MediatR;

namespace Karusc.Server.Application.LineItemEntities.Carts.RemoveFromCart
{
    internal sealed class RemoveFromCartCommandhandler
        : CartRequestHandler, IRequestHandler<RemoveFromCartCommand, CartDto>
    {
        public RemoveFromCartCommandhandler(
            ICurrentUserService currentUserService,
            IKaruscDbContext context,
            IFileStorageService<Product> fileStorageService)
            : base(currentUserService, context, fileStorageService.EnrichmentPrefix) { }

        public async Task<CartDto> Handle(
            RemoveFromCartCommand request,
            CancellationToken cancellationToken) => await HandleCartOperationAsync(
                cart => cart.RemoveLineItem(request.LineItemId),
                cancellationToken);
    }
}