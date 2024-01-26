using Karusc.Server.Domain;

namespace Karusc.Server.Application.Products
{
    internal record ProductDto(
        Guid id,
        string title, 
        decimal price, 
        string description, 
        string category,
        List<string>? images)
    {
        internal ProductDto(Product p) : this(
            p.Id, 
            p.Title, 
            p.Price, 
            p.Description, 
            p.Category, 
            p.Images?.Select(image => image.FileName)?.ToList()) { }
    }
}
