using Karusc.Server.Application.Contracts;
using Karusc.Server.Domain.Reviews;
using Karusc.Server.Domain.Users;
using MediatR;

namespace Karusc.Server.Application.Reviews.Create
{
    internal sealed class CreateReviewCommandHandler 
        : IRequestHandler<CreateReviewCommand, ReviewDto>
    {
        private readonly ICurrentUserService _currentUserService;
        private readonly IKaruscDbContext _context;
        private readonly string? _enrichmentPrefix;

        public CreateReviewCommandHandler(
            ICurrentUserService currentUserService, 
            IKaruscDbContext context,
            IFileStorageService<User> fileStorageService)
        {
            _currentUserService = currentUserService;
            _context = context;
            _enrichmentPrefix = fileStorageService.EnrichmentPrefix;
        } 

        public async Task<ReviewDto> Handle(
            CreateReviewCommand request, 
            CancellationToken cancellationToken)
        {
            var currentUser = await _currentUserService.GetCurrentUser(cancellationToken);
            var review = Review.Create(currentUser, request.Title, request.Rating);
            await _context.Reviews.AddAsync(review, cancellationToken);
            await _context.SaveChangesAsync(cancellationToken);
            
            var dto = new ReviewDto(review);
            return !string.IsNullOrEmpty(_enrichmentPrefix)
                ? dto with 
                { 
                    Author = dto.Author with 
                    { 
                        ProfilePictureUrl = string.Concat(
                            _enrichmentPrefix, 
                            dto.Author!.ProfilePictureUrl)
                    } 
                }
                : new(review);
        }
    }
}
