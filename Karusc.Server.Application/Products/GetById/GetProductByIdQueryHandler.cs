using Karusc.Server.Application.Contracts;
using Karusc.Server.Domain;
using MediatR;

namespace Karusc.Server.Application.Products.GetById
{
    internal sealed class GetProductByIdQueryHandler : IRequestHandler<GetProductByIdQuery, Product>
    {
        private readonly IKaruscDbContext _context;

        public GetProductByIdQueryHandler(IKaruscDbContext context) =>
            _context = context;
        public async Task<Product> Handle(GetProductByIdQuery request, CancellationToken cancellationToken) =>
            await _context.Products.FindAsync(request.Id, cancellationToken)
                ??  throw new KeyNotFoundException(request.Id.ToString());
    }
}
