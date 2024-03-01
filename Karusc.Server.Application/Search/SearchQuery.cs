using MediatR;

namespace Karusc.Server.Application.Search
{
    public record SearchQuery(string Text, int ResultsSize) : IRequest<List<SearchDto>>;
}
