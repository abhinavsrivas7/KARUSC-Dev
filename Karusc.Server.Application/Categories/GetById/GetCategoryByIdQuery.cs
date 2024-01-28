using MediatR;

namespace Karusc.Server.Application.Categories.GetById
{
    public record GetCategoryByIdQuery(Guid Id) : IRequest<CategoryDto>;
}
