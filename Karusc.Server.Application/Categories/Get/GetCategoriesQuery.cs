using MediatR;

namespace Karusc.Server.Application.Categories.Get
{
    public record GetCategoriesQuery(int PageSize, int PageNumber) : IRequest<List<CategoryDto>>;
}
