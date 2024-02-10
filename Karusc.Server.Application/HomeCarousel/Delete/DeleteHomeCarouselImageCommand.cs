using MediatR;

namespace Karusc.Server.Application.HomeCarousel.Delete
{
    public record DeleteHomeCarouselImageCommand(Guid Id) : IRequest<Guid>;
}
