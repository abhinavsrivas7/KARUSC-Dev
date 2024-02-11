using Karusc.Server.Application.Contracts;
using Karusc.Server.Domain.Products;
using MediatR;

namespace Karusc.Server.Application.Categories.Create
{
    internal sealed class CreateCategoryCommandHandler
        : IRequestHandler<CreateCategoryCommand, CategoryDto>
    {
        private readonly IKaruscDbContext _context;
        private readonly IFileStorageService<Category> _fileStorageService;

        public CreateCategoryCommandHandler(
            IKaruscDbContext context,
            IFileStorageService<Category> fileStorageService) => 
            (_context, _fileStorageService) = (context, fileStorageService);

        public async Task<CategoryDto> Handle(
            CreateCategoryCommand request, 
            CancellationToken cancellationToken)
        {
            var category = Category.Create(request.Name, request.Image);
            
            category.ImageURL = await _fileStorageService
                .Upload(category.Image!, cancellationToken);

            await _context.Categories.AddAsync(category, cancellationToken);
            await _context.SaveChangesAsync(cancellationToken);

            return string.IsNullOrEmpty(_fileStorageService.EnrichmentPrefix)
                ? new CategoryDto(category.Id, category.Name, category.ImageURL!)
                : new CategoryDto(
                    category.Id, 
                    category.Name, 
                    string.Concat(_fileStorageService.EnrichmentPrefix, category.ImageURL!));
        }
    }
}
