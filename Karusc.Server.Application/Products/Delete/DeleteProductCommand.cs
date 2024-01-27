using MediatR;

namespace Karusc.Server.Application.Products.Delete
{
    public record DeleteProductCommand(Guid Id) : IRequest<Guid>;
}
