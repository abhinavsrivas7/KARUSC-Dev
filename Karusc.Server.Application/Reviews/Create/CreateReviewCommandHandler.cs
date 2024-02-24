using Karusc.Server.Application.Contracts;
using Karusc.Server.Domain.Reviews;
using MediatR;

namespace Karusc.Server.Application.Reviews.Create
{
    internal sealed class CreateReviewCommandHandler 
        : IRequestHandler<CreateReviewCommand, ReviewDto>
    {
        private ICurrentUserService _currentUserService;
        private IKaruscDbContext _context;

        public CreateReviewCommandHandler(
            ICurrentUserService currentUserService, 
            IKaruscDbContext context) => (_currentUserService, _context) = 
                (currentUserService, context);

        public async Task<ReviewDto> Handle(
            CreateReviewCommand request, 
            CancellationToken cancellationToken)
        {
            var currentUser = await _currentUserService.GetCurrentUser(cancellationToken);
            var review = Review.Create(currentUser, request.Title, request.Rating);
            await _context.Reviews.AddAsync(review, cancellationToken);
            await _context.SaveChangesAsync(cancellationToken);
            return new(review);
        }
    }
}
