using Karusc.Server.Application.Contracts;
using Karusc.Server.Domain.Products;
using Microsoft.EntityFrameworkCore;

namespace Karusc.Server.Application.Search
{
    internal static class SearchExtensions
    {
        internal static async Task<List<SearchDto>> Search<T>(
            this IKaruscDbContext context, string text, int resultSize)
            where T : class, ISearchableEntity => await context
                .Set<T>()
                .Where(entity => entity.Name.Contains(text))
                .Take(resultSize)
                .Select(entity => new SearchDto(
                    entity.Id,
                    entity.Name,
                    typeof(T).Name))
                .AsNoTracking()
                .ToListAsync();
    }
}
