using Karusc.Server.Application.Contracts;
using Karusc.Server.Domain;
using MediatR;

namespace Karusc.Server.Application.Products.Create
{
    internal sealed class CreateProductCommandHandler : IRequestHandler<CreateProductCommand, Product>
    {
        private readonly IKaruscDbContext _context;

        public CreateProductCommandHandler(IKaruscDbContext context) => _context = context;

        public async Task<Product> Handle(CreateProductCommand command, CancellationToken cancellationToken)
        {
            var productToCreate = Product.Create(
                command.Title,
                command.Price,
                command.Description,
                command.Category,
                command.Image);

            await _context.Products.AddAsync(productToCreate, cancellationToken);
            await _context.SaveChangesAsync(cancellationToken);
            return productToCreate;
        }
    }
}
