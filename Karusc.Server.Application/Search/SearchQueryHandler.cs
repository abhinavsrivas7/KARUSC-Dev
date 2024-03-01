using Karusc.Server.Application.Contracts;
using Karusc.Server.Domain.Products;
using MediatR;

namespace Karusc.Server.Application.Search
{
    internal sealed class SearchQueryHandler : IRequestHandler<SearchQuery, List<SearchDto>>
    {
        private readonly IKaruscDbContext _context;

        public SearchQueryHandler(IKaruscDbContext context) => _context = context;

        public async Task<List<SearchDto>> Handle(
            SearchQuery request, 
            CancellationToken cancellationToken)
        {
            var results = await _context
                .Search<Category>(request.Text, request.ResultsSize);

            results.AddRange(await _context
                .Search<Collection>(request.Text, request.ResultsSize));

            return results
                .DistinctBy(dto => dto.Title)
                .Take(request.ResultsSize)
                .ToList();
        }
    }
}