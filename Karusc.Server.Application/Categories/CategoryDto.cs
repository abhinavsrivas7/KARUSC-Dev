using Karusc.Server.Domain.Products;

namespace Karusc.Server.Application.Categories
{
    internal record CategoryDto(Guid Id, string Name, string ImageURL)
    {
        internal CategoryDto(Category category) : 
            this(category.Id, category.Name, category.ImageURL!) { }
    }
}
