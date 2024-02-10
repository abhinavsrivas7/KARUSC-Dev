using Karusc.Server.Application.Contracts;
using Karusc.Server.Domain.UI;
using MediatR;

namespace Karusc.Server.Application.HomeCarousel.BulkCreate
{
    internal sealed class BulkCreateHomeCarouselImagesCommandHandler
        : IRequestHandler<BulkCreateHomeCarouselImagesCommand, List<HomeCarouselImageDto>>
    {
        private readonly IKaruscDbContext _context;
        private readonly IFileStorageService<HomeCarouselImage> _fileStorageService;

        public BulkCreateHomeCarouselImagesCommandHandler(
            IKaruscDbContext context,
            IFileStorageService<HomeCarouselImage> fileStorageService) =>
            (_context, _fileStorageService) = (context, fileStorageService);

        public async Task<List<HomeCarouselImageDto>> Handle(
            BulkCreateHomeCarouselImagesCommand request, 
            CancellationToken cancellationToken)
        {
            var carouselImages = request.Images
                .Select(image => HomeCarouselImage.Create(image))
                .ToList();

            var uploadResults = await _fileStorageService.BulkUpload(
                carouselImages.Select(image => image.Image!).ToList(), 
                cancellationToken);

            carouselImages.ForEach(image => image.ImageURL = uploadResults[image.Image!.Id]);
            await _context.HomeCarouselImages.AddRangeAsync(carouselImages, cancellationToken);
            await _context.SaveChangesAsync(cancellationToken);

            return string.IsNullOrEmpty(_fileStorageService.EnrichmentPrefix)
                ? carouselImages
                    .Select(image => new HomeCarouselImageDto(image.Id, image.ImageURL!))
                    .ToList()
                : carouselImages
                    .Select(image => new HomeCarouselImageDto(
                        image.Id,
                        string.Concat(_fileStorageService.EnrichmentPrefix, image.ImageURL!)))
                    .ToList();
        }
    }
}
