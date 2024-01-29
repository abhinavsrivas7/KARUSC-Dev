using MediatR;

namespace Karusc.Server.Application.Collections.Delete
{
    public record DeleteCollectionCommand(Guid Id) : IRequest<Guid>;
}
