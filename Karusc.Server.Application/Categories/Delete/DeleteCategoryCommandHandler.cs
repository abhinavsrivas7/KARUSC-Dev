using Karusc.Server.Application.Contracts;
using Karusc.Server.Domain;
using MediatR;

namespace Karusc.Server.Application.Categories.Delete
{
    internal class DeleteCategoryCommandHandler : IRequestHandler<DeleteCategoryCommand, Guid>
    {
        private readonly IKaruscDbContext _context;
        private readonly IFileStorageService<Category> _fileStorageService;

        public DeleteCategoryCommandHandler(
            IKaruscDbContext context, IFileStorageService<Category> fileStorageService) => 
            (_context, _fileStorageService) = (context, fileStorageService);

        public async Task<Guid> Handle(
            DeleteCategoryCommand request, CancellationToken cancellationToken)
        {
            var category = await _context.Categories.FindAsync(request.Id, cancellationToken)
                ?? throw new KeyNotFoundException(request.Id.ToString());
            
            _context.Categories.Remove(category);
            await _context.SaveChangesAsync(cancellationToken);
            await _fileStorageService.Delete(category.Image!, cancellationToken);
            return request.Id;
        }
    }
}
