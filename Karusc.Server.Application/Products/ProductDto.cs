using Karusc.Server.Application.Categories;
using Karusc.Server.Application.Collections;
using Karusc.Server.Domain.Products;

namespace Karusc.Server.Application.Products
{
    internal record ProductDto(
        Guid Id,
        string Title, 
        decimal Price, 
        string Description,
        string CareInstructions,
        List<string>? Images,
        List<CategoryDto>? Categories,
        List<CollectionDTO>? Collections)
    {
        internal ProductDto(Product p) : this(
            p.Id, 
            p.Title, 
            p.Price, 
            p.Description, 
            p.CareInstructions,
            p.Images?.Select(image => image.FileName)?.ToList(),
            p.Categories?.Select(category => new CategoryDto(category))?.ToList(),
            p.Collections?.Select(collection => new CollectionDTO(collection)).ToList()) {}

        internal ProductDto EnrichImageNames(string prefix) => this with 
        { 
            Images = Images?
                .Select(image => string.Concat(prefix, image))
                .ToList(),
            Categories = Categories?
                .Select(category => category with 
                { 
                    ImageURL = string.Concat(prefix, category.ImageURL) 
                }).ToList(),
            Collections = Collections?
                .Select(collection => collection with
                {
                    ImageURL = string.Concat(prefix, collection.ImageURL)
                }).ToList()
        };
    }
}
