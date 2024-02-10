using Karusc.Server.Application.Contracts;
using Karusc.Server.Domain.UI;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Karusc.Server.Application.HomeCarousel.Get
{
    internal sealed class GetHomeCarouselImagesQueryHandler 
        : IRequestHandler<GetHomeCarouselImagesQuery, List<HomeCarouselImageDto>>
    {
        private readonly IKaruscDbContext _context;
        private readonly string? _enrichmentPrefix;

        public GetHomeCarouselImagesQueryHandler(
            IKaruscDbContext context,
            IFileStorageService<HomeCarouselImage> fileStorageService) =>
            (_context, _enrichmentPrefix) = 
            (context, fileStorageService.EnrichmentPrefix);

        public async Task<List<HomeCarouselImageDto>> Handle(
            GetHomeCarouselImagesQuery request,
            CancellationToken cancellationToken) => (await _context
            .HomeCarouselImages
            .ToListAsync(cancellationToken))
            .Select(image => new HomeCarouselImageDto(
                image.Id,
                string.IsNullOrEmpty(_enrichmentPrefix)
                    ? image.ImageURL!
                    : string.Concat(_enrichmentPrefix, image.ImageURL!)))
            .ToList();
    }
}
