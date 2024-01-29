using MediatR;

namespace Karusc.Server.Application.Collections.Create
{
    public record CreateCollectionCommand(string Name, string Image) 
        : IRequest<CollectionDTO>;
}
