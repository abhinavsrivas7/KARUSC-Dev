using Karusc.Server.Application.Contracts;
using Karusc.Server.Domain.UI;
using MediatR;

namespace Karusc.Server.Application.HomeCarousel.Delete
{
    internal sealed class DeleteHomeCarouselImageCommandHandler
        : IRequestHandler<DeleteHomeCarouselImageCommand, Guid>
    {
        private readonly IKaruscDbContext _context;
        private readonly IFileStorageService<HomeCarouselImage> _fileStorageService;

        public DeleteHomeCarouselImageCommandHandler(
            IKaruscDbContext context,
            IFileStorageService<HomeCarouselImage> fileStorageService) =>
            (_context, _fileStorageService) = (context, fileStorageService);

        public async Task<Guid> Handle(
            DeleteHomeCarouselImageCommand request, 
            CancellationToken cancellationToken)
        {
            var carouselImage = await _context.HomeCarouselImages
                .FindAsync(request.Id, cancellationToken)
                ?? throw new KeyNotFoundException(request.Id.ToString());

            _context.HomeCarouselImages.Remove(carouselImage);
            await _context.SaveChangesAsync(cancellationToken);
            await _fileStorageService.Delete(carouselImage.ImageURL!, cancellationToken);
            return request.Id;
        }
    }
}
