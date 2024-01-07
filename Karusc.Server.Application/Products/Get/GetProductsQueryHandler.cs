using Karusc.Server.Application.Contracts;
using Karusc.Server.Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Karusc.Server.Application.Products.Get
{
    internal sealed class GetProductsQueryHandler : IRequestHandler<GetProductsQuery, List<Product>>
    {
        private readonly IKaruscDbContext _context;

        public GetProductsQueryHandler(IKaruscDbContext context) => _context = context;

        public async Task<List<Product>> Handle(GetProductsQuery request, CancellationToken cancellationToken) => 
            await _context.Products
                .Skip(request.pageSize * request.pageNumber)
                .Take(request.pageSize)
                .ToListAsync(cancellationToken);
    }
}
