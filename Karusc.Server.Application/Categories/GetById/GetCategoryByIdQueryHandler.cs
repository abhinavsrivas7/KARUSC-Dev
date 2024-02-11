using Karusc.Server.Application.Contracts;
using Karusc.Server.Domain.Product;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Karusc.Server.Application.Categories.GetById
{
    internal sealed class GetCategoryByIdQueryHandler :
        IRequestHandler<GetCategoryByIdQuery, CategoryDto>
    {
        private readonly IKaruscDbContext _context;
        private readonly string? _enrichmentPrefix;

        public GetCategoryByIdQueryHandler(
            IKaruscDbContext context,
            IFileStorageService<Category> fileStorageService) =>
            (_context, _enrichmentPrefix) = (context, fileStorageService.EnrichmentPrefix);

        public async Task<CategoryDto> Handle(
            GetCategoryByIdQuery request, 
            CancellationToken cancellationToken)
        {
            var category = await _context.Categories
                .Select(category => new CategoryDto(
                    category.Id,
                    category.Name,
                    category.ImageURL!))
                .FirstOrDefaultAsync(category => category.Id == request.Id, cancellationToken)
                ?? throw new KeyNotFoundException(request.Id.ToString());

            return string.IsNullOrEmpty(_enrichmentPrefix)
                ? category
                : category with 
                { 
                    ImageURL = string.Concat(_enrichmentPrefix, category.ImageURL) 
                };
        }
    }
}
