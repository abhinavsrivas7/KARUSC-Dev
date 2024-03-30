using MediatR;

namespace Karusc.Server.Application.Test
{
    public record CreateBulkProductCommand(
        string Title,
        decimal Price,
        string Description,
        string CareInstructions,
        List<string> Images,
        HashSet<Guid>? Categories,
        HashSet<Guid>? Collections) : IRequest<string>;
}
