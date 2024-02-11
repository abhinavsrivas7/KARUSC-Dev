using Karusc.Server.Application.Contracts;
using Karusc.Server.Domain.Products;
using MediatR;

namespace Karusc.Server.Application.Collections.Create
{
    internal sealed class CreateCollectionCommandHandler :
        IRequestHandler<CreateCollectionCommand, CollectionDTO>
    {
        private readonly IKaruscDbContext _context;
        private readonly IFileStorageService<Collection> _fileStorageService;

        public CreateCollectionCommandHandler(
            IKaruscDbContext context,
            IFileStorageService<Collection> fileStorageService) =>
            (_context, _fileStorageService) = (context, fileStorageService);

        public async Task<CollectionDTO> Handle(
            CreateCollectionCommand request,
            CancellationToken cancellationToken)
        {
            var collection = Collection.Create(request.Name, request.Image);

            collection.ImageURL = await _fileStorageService
                .Upload(collection.Image!, cancellationToken);

            await _context.Collections.AddAsync(collection, cancellationToken);
            await _context.SaveChangesAsync(cancellationToken);

            return string.IsNullOrEmpty(_fileStorageService.EnrichmentPrefix)
                ? new CollectionDTO(collection.Id, collection.Name, collection.ImageURL!)
                : new CollectionDTO(
                    collection.Id,
                    collection.Name,
                    string.Concat(_fileStorageService.EnrichmentPrefix, collection.ImageURL!));
        }
    }
}
