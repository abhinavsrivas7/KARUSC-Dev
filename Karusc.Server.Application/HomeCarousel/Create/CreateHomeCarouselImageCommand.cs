using MediatR;

namespace Karusc.Server.Application.HomeCarousel.Create
{
    public record CreateHomeCarouselImageCommand(string image) 
        : IRequest<HomeCarouselImageDto>;
}
