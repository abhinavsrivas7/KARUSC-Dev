using Karusc.Server.Application.Users;
using Karusc.Server.Domain.Reviews;

namespace Karusc.Server.Application.Reviews
{
    internal record ReviewDto(
        Guid Id, 
        UserDto Author,
        string Title, 
        Rating Rating)
    {
        internal ReviewDto(Review review) : 
            this(review.Id, new UserDto(review.Author), review.Title, review.Rating) { }

        internal ReviewDto EnrichUserProfilePicture(string? enrichmentPrefix) => this with
        {
            Author = Author.EnrichProfilePicture(enrichmentPrefix)
        };
    }
}
