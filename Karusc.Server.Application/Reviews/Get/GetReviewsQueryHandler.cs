﻿using Karusc.Server.Application.Contracts;
using Karusc.Server.Application.Users;
using Karusc.Server.Domain.Users;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Karusc.Server.Application.Reviews.Get
{
    internal sealed class GetReviewsQueryHandler : IRequestHandler<GetReviewsQuery, List<ReviewDto>>
    {
        private readonly IKaruscDbContext _context;
        private readonly string? _enrichmentPrefix;
        public GetReviewsQueryHandler(
            IKaruscDbContext context,
            IFileStorageService<User> fileStorageService) =>
            (_context, _enrichmentPrefix) = (context, fileStorageService.EnrichmentPrefix);
        
        public async Task<List<ReviewDto>> Handle(
            GetReviewsQuery request,
            CancellationToken cancellationToken)
        {
            var reviews = await _context.Reviews
                .Skip(request.PageNumber * request.PageSize)
                .Take(request.PageSize)
                .Select(review => new ReviewDto(
                    review.Id,
                    new UserDto(review.Author!),
                    review.Title,
                    review.Rating))
                .AsNoTracking()
                .ToListAsync(cancellationToken);

            if(!string.IsNullOrEmpty(_enrichmentPrefix))
            {
                reviews = reviews.Select(review => review with
                {
                    Author = review.Author with
                    {
                        ProfilePictureUrl = string.Concat(
                            _enrichmentPrefix, 
                            review.Author.ProfilePictureUrl)
                    }
                }).ToList();
            }

            return reviews;
        }
    }
}
