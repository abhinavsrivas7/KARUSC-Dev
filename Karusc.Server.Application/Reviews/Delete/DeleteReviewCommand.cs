using MediatR;

namespace Karusc.Server.Application.Reviews.Delete
{
    public record DeleteReviewCommand(Guid Id): IRequest<Guid>;
}
