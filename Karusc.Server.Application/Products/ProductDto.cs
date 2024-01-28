using Karusc.Server.Application.Categories;
using Karusc.Server.Domain;

namespace Karusc.Server.Application.Products
{
    internal record ProductDto(
        Guid Id,
        string Title, 
        decimal Price, 
        string Description, 
        List<string>? Images,
        List<CategoryDto>? Categories)
    {
        internal ProductDto(Product p) : this(
            p.Id, 
            p.Title, 
            p.Price, 
            p.Description, 
            p.Images?.Select(image => image.FileName)?.ToList(),
            p.Categories?.Select(category => new CategoryDto(category))?.ToList()) {}

        internal ProductDto EnrichImageNames(string prefix) => this with 
        { 
            Images = Images?
                .Select(image => string.Concat(prefix, image))
                .ToList(),
            Categories = Categories?
                .Select(category => category with { ImageURL = string.Concat(prefix, category.ImageURL) })
                .ToList(),
        };
    }
}
