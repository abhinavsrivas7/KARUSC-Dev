using MediatR;

namespace Karusc.Server.Application.Collections.GetById
{
    public record GetCollectionByIdQuery(Guid Id) : IRequest<CollectionDTO>;
}
