using Karusc.Server.Application.Contracts;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Karusc.Server.Application.Reviews.Get
{
    internal sealed class GetReviewsQueryHandler : IRequestHandler<GetReviewsQuery, List<ReviewDto>>
    {
        private readonly IKaruscDbContext _context;

        public GetReviewsQueryHandler(IKaruscDbContext context) => _context = context;

        public async Task<List<ReviewDto>> Handle(
            GetReviewsQuery request, 
            CancellationToken cancellationToken) => await _context.Reviews
                .Skip(request.PageNumber * request.PageSize)
                .Take(request.PageSize)
                .Select(review => new ReviewDto(review))
                .AsNoTracking()
                .ToListAsync(cancellationToken);
    }
}
