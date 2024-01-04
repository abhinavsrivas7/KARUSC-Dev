using Karusc.Server.Application.Contracts;
using Karusc.Server.Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Karusc.Server.Application.Products.GetAllProducts
{
    public class GetAllProductsRequestHandler : 
        IRequestHandler<GetAllProductsRequest, List<Product>>
    {
        private readonly IKaruscDbContext _context;

        public GetAllProductsRequestHandler(IKaruscDbContext context) => 
            _context = context;

        public async Task<List<Product>> Handle(
            GetAllProductsRequest request, 
            CancellationToken cancellationToken) => await _context.Products
                .Skip(request.pageSize * request.pageNumber)
                .Take(request.pageSize)
                .ToListAsync();
    }
}
