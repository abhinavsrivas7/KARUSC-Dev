using MediatR;

namespace Karusc.Server.Application.HomeCarousel.Get
{
    public class GetHomeCarouselImagesQuery : IRequest<List<HomeCarouselImageDto>>;
}
