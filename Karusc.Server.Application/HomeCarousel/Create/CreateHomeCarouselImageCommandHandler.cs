using Karusc.Server.Application.Contracts;
using Karusc.Server.Domain;
using Karusc.Server.Domain.UI;
using MediatR;

namespace Karusc.Server.Application.HomeCarousel.Create
{
    internal sealed class CreateHomeCarouselImageCommandHandler
        : IRequestHandler<CreateHomeCarouselImageCommand, HomeCarouselImageDto>
    {
        private readonly IKaruscDbContext _context;
        private readonly IFileStorageService<HomeCarouselImage> _fileStorageService;

        public CreateHomeCarouselImageCommandHandler(
            IKaruscDbContext context, 
            IFileStorageService<HomeCarouselImage> fileStorageService) =>
            (_context, _fileStorageService) = (context, fileStorageService);

        public async Task<HomeCarouselImageDto> Handle(
            CreateHomeCarouselImageCommand request,
            CancellationToken cancellationToken)
        {
            var carouselImage = HomeCarouselImage.Create(request.image);
            
            carouselImage.ImageURL = await _fileStorageService
                .Upload(carouselImage.Image!, cancellationToken);
            
            await _context.HomeCarouselImages.AddAsync(carouselImage, cancellationToken);
            await _context.SaveChangesAsync(cancellationToken);
            
            return new HomeCarouselImageDto(
                carouselImage.Id,
                string.IsNullOrEmpty(_fileStorageService.EnrichmentPrefix)
                    ? carouselImage.ImageURL!
                    : string.Concat(
                        _fileStorageService.EnrichmentPrefix,
                        carouselImage.ImageURL!));
        }
    }
}
