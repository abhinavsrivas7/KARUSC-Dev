using Karusc.Server.Application.Contracts;
using MediatR;

namespace Karusc.Server.Application.Reviews.Delete
{
    internal sealed class DeleteReviewCommandHandler : IRequestHandler<DeleteReviewCommand, Guid>
    {
        private IKaruscDbContext _context;
        private ICurrentUserService _currentUserService;

        public DeleteReviewCommandHandler(ICurrentUserService currentUserService,
            IKaruscDbContext context) => (_currentUserService, _context) =
                (currentUserService, context);

        public async Task<Guid> Handle(
            DeleteReviewCommand request, 
            CancellationToken cancellationToken)
        {
            var review = await _context.Reviews.FindAsync(request.Id, cancellationToken)
                ?? throw new KeyNotFoundException(request.Id.ToString());

            var currentUser = await _currentUserService.GetCurrentUser(cancellationToken);

            if(!review.IsDeleteableBy(currentUser))
            {
                throw new InvalidOperationException("Review can only be deleted by author.");
            }

            _context.Reviews.Remove(review);
            await _context.SaveChangesAsync(cancellationToken);
            return request.Id;
        }
    }
}
