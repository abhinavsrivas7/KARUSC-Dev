using Karusc.Server.Domain.Product;

namespace Karusc.Server.Application.Categories
{
    internal record CategoryDto(Guid Id, string Name, string ImageURL)
    {
        internal CategoryDto(Category category) : 
            this(category.Id, category.Name, category.ImageURL!) { }
    }
}
