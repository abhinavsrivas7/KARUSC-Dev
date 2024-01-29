using Karusc.Server.Application.Contracts;
using Karusc.Server.Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Karusc.Server.Application.Collections.GetById
{
    internal sealed class GetCollectionByIdQueryHandler
        : IRequestHandler<GetCollectionByIdQuery, CollectionDTO>
    {
        private readonly IKaruscDbContext _context;
        private readonly string? _enrichmentPrefix;

        public GetCollectionByIdQueryHandler(
            IKaruscDbContext context,
            IFileStorageService<Collection> fileStorageService) =>
            (_context, _enrichmentPrefix) = (context, fileStorageService.EnrichmentPrefix);

        public async Task<CollectionDTO> Handle(
            GetCollectionByIdQuery request,
            CancellationToken cancellationToken)
        {
            var collection = await _context.Collections
                .Select(collection => new CollectionDTO(
                    collection.Id,
                    collection.Name,
                    collection.ImageURL!))
                .FirstOrDefaultAsync(collection => collection.Id == request.Id, cancellationToken)
                ?? throw new KeyNotFoundException(request.Id.ToString());

            return string.IsNullOrEmpty(_enrichmentPrefix)
                ? collection
                : collection with 
                { 
                    ImageURL = string.Concat(_enrichmentPrefix, collection.ImageURL) 
                };
        }
    }
}
