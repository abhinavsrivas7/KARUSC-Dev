using MediatR;

namespace Karusc.Server.Application.Products.Get
{
    public record GetProductsQuery(
        int PageSize, 
        int PageNumber,
        HashSet<Guid> Categories, 
        HashSet<Guid> Collections) : IRequest<ProductWithCountDto>
    {
        public GetProductsQuery(
            int pageSize,
            int pageNumber,
            string categories,
            string collections) : this(
                pageSize, 
                pageNumber,
                categories
                    .Split(',')
                    .Where(category => !string.IsNullOrEmpty(category))
                    .Select(category => new Guid(category))
                    .ToHashSet(),
                collections
                    .Split(',')
                    .Where(collection => !string.IsNullOrEmpty(collection))
                    .Select(collection => new Guid(collection))
                    .ToHashSet()) { }
    };
}
