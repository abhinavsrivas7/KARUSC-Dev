using MediatR;

namespace Karusc.Server.Application.Products.Create
{
    public record CreateProductCommand(
        string Title,
        decimal Price,
        string Description,
        List<string>? Images,
        HashSet<Guid>? Categories) : IRequest<ProductDto>;
}
