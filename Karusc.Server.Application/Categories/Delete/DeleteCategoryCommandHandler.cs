using Karusc.Server.Application.Contracts;
using MediatR;

namespace Karusc.Server.Application.Categories.Delete
{
    internal class DeleteCategoryCommandHandler : IRequestHandler<DeleteCategoryCommand, Guid>
    {
        private readonly IKaruscDbContext _context;

        public DeleteCategoryCommandHandler(IKaruscDbContext context) => _context = context;

        public async Task<Guid> Handle(DeleteCategoryCommand request, CancellationToken cancellationToken)
        {
            var category = await _context.Categories.FindAsync(request.Id, cancellationToken)
                ?? throw new KeyNotFoundException(request.Id.ToString());
            
            _context.Categories.Remove(category);
            await _context.SaveChangesAsync(cancellationToken);
            return request.Id;
        }
    }
}
