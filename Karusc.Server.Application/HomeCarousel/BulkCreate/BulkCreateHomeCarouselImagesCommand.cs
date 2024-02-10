using MediatR;

namespace Karusc.Server.Application.HomeCarousel.BulkCreate
{
    public record BulkCreateHomeCarouselImagesCommand(List<string> Images)
        : IRequest<List<HomeCarouselImageDto>>;
}
