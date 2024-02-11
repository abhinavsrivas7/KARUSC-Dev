using Karusc.Server.Application.Contracts;
using Karusc.Server.Domain.Product;
using MediatR;

namespace Karusc.Server.Application.Collections.Delete
{
    internal sealed class DeleteCollectionCommandHandler
        : IRequestHandler<DeleteCollectionCommand, Guid>
    {
        private readonly IKaruscDbContext _context;
        private readonly IFileStorageService<Collection> _fileStorageService;

        public DeleteCollectionCommandHandler(
            IKaruscDbContext context, IFileStorageService<Collection> fileStorageService) =>
            (_context, _fileStorageService) = (context, fileStorageService);

        public async Task<Guid> Handle(
            DeleteCollectionCommand request, CancellationToken cancellationToken)
        {
            var collection = await _context.Collections
                .FindAsync(request.Id, cancellationToken)
                ?? throw new KeyNotFoundException(request.Id.ToString());

            _context.Collections.Remove(collection);
            await _context.SaveChangesAsync(cancellationToken);
            await _fileStorageService.Delete(collection.ImageURL!, cancellationToken);
            return request.Id;
        }
    }
}
