using Karusc.Server.Application.Contracts;
using Karusc.Server.Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Karusc.Server.Application.Categories.Get
{
    internal class GetCategoriesQueryHandler 
        : IRequestHandler<GetCategoriesQuery, List<CategoryDto>>
    {
        private readonly IKaruscDbContext _context;
        private readonly string? _enrichmentPrefix;

        public GetCategoriesQueryHandler(
            IKaruscDbContext context, 
            IFileStorageService<Category> fileStorageService) =>
            (_context, _enrichmentPrefix) = (context, fileStorageService.EnrichmentPrefix);

        public async Task<List<CategoryDto>> Handle(
            GetCategoriesQuery request, 
            CancellationToken cancellationToken)
        {
            var categories  = await _context.Categories
                .Select(category => new CategoryDto(
                    category.Id,
                    category.Name,
                    category.ImageURL!))
                .Skip(request.PageSize * request.PageNumber)
                .Take(request.PageSize)
                .ToListAsync(cancellationToken);

            return !string.IsNullOrEmpty(_enrichmentPrefix)
                ? categories.Select(category => category with 
                  { 
                      ImageURL = string.Concat(_enrichmentPrefix, category.ImageURL) 
                  }).ToList()
                : categories;
        }
    }
}
