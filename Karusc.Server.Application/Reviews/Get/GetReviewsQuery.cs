using MediatR;

namespace Karusc.Server.Application.Reviews.Get
{
    public record GetReviewsQuery(int PageNumber, int PageSize) : IRequest<List<ReviewDto>>;
}
