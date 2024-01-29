using MediatR;

namespace Karusc.Server.Application.Categories.Delete
{
    public record DeleteCategoryCommand(Guid Id) : IRequest<Guid>;
}
