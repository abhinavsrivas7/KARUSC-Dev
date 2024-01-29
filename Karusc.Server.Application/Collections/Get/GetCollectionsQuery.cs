using MediatR;

namespace Karusc.Server.Application.Collections.Get
{
    public record GetCollectionsQuery(int PageSize, int PageNumber) 
        : IRequest<List<CollectionDTO>>;
}
