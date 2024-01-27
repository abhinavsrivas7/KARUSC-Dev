using Karusc.Server.Domain;

namespace Karusc.Server.Application.Products
{
    internal record ProductDto(
        Guid Id,
        string Title, 
        decimal Price, 
        string Description, 
        string Category,
        List<string>? Images)
    {
        internal ProductDto(Product p) : this(
            p.Id, 
            p.Title, 
            p.Price, 
            p.Description, 
            p.Category, 
            p.Images?.Select(image => image.FileName)?.ToList()) {}

        internal ProductDto EnrichImageNames(string prefix) => this with { Images = Images?
            .Select(image => string.Concat(prefix, image))
            .ToList() };
    }
}
