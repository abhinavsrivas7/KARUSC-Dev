using MediatR;

namespace Karusc.Server.Application.Products.Create
{
    public record CreateProductCommand(
        string Title,
        decimal Price,
        string Description,
        string CareInstructions,
        List<string> Images,
        HashSet<Guid>? Categories,
        HashSet<Guid>? Collections) : IRequest<ProductDto>;
}
