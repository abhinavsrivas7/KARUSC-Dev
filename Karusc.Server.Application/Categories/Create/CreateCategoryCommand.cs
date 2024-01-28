using MediatR;

namespace Karusc.Server.Application.Categories.Create
{
    public record CreateCategoryCommand(string Name, string Image) : IRequest<CategoryDto>;
}
