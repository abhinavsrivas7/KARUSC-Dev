using Karusc.Server.Application.Contracts;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Karusc.Server.Application.Products.Delete
{
    internal sealed class DeleteProductCommandHandler : IRequestHandler<DeleteProductCommand, Guid>
    {
        private readonly IKaruscDbContext _context;
        
        public DeleteProductCommandHandler(IKaruscDbContext context) => _context = context;

        public async Task<Guid> Handle(
            DeleteProductCommand request, 
            CancellationToken cancellationToken)
        {
            var product = await _context.Products.FindAsync(request.Id, cancellationToken)
                ?? throw new KeyNotFoundException(request.Id.ToString());

            _context.Products.Remove(product);
            await _context.SaveChangesAsync(cancellationToken);
            return request.Id;
        }
    }
}
