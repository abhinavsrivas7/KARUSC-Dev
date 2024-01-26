using MediatR;

namespace Karusc.Server.Application.Products.GetById
{
    public record GetProductByIdQuery(Guid Id) : IRequest<ProductDto>;
}
