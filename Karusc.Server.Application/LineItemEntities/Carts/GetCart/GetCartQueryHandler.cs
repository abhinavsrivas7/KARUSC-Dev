using Karusc.Server.Application.Contracts;
using Karusc.Server.Domain.Products;
using MediatR;

namespace Karusc.Server.Application.LineItemEntities.Carts.GetCart
{
    internal sealed class GetCartQueryHandler
        : CartRequestHandler, IRequestHandler<GetCartQuery, CartDto>
    {
        public GetCartQueryHandler(
            ICurrentUserService currentUserService,
            IKaruscDbContext context,
            IFileStorageService<Product> fileStorageService)
        : base(currentUserService, context, fileStorageService.EnrichmentPrefix) { }

        public async Task<CartDto> Handle(GetCartQuery request, CancellationToken cancellationToken) =>
            await HandleCartOperationAsync(null, cancellationToken);
    }
}
