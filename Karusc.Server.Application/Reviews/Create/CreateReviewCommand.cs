using Karusc.Server.Domain.Reviews;
using MediatR;

namespace Karusc.Server.Application.Reviews.Create
{
    public record CreateReviewCommand(string Title, Rating Rating) : IRequest<ReviewDto>;
}
 