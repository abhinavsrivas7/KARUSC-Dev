using Karusc.Server.Application.Contracts;
using Karusc.Server.Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Karusc.Server.Application.Collections.Get
{
    internal sealed class GetCollectionsQueryHandler
        : IRequestHandler<GetCollectionsQuery, List<CollectionDTO>>
    {
        private readonly IKaruscDbContext _context;
        private readonly string? _enrichmentPrefix;

        public GetCollectionsQueryHandler(
            IKaruscDbContext context,
            IFileStorageService<Collection> fileStorageService) =>
            (_context, _enrichmentPrefix) = (context, fileStorageService.EnrichmentPrefix);

        public async Task<List<CollectionDTO>> Handle(
            GetCollectionsQuery request,
            CancellationToken cancellationToken)
        {
            var collections = await _context.Collections
                .Select(collection => new CollectionDTO(
                    collection.Id,
                    collection.Name,
                    collection.ImageURL!))
                .Skip(request.PageSize * request.PageNumber)
                .Take(request.PageSize)
                .ToListAsync(cancellationToken);

            return !string.IsNullOrEmpty(_enrichmentPrefix)
                ? collections.Select(collection => collection with
                {
                    ImageURL = string.Concat(_enrichmentPrefix, collection.ImageURL)
                }).ToList()
                : collections;
        }
    }
}
