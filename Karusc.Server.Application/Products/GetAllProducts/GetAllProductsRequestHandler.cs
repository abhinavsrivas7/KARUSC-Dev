using Karusc.Server.Domain;
using MediatR;

namespace Karusc.Server.Application.Products.GetAllProducts
{
    public record GetAllProductsRequestHandler : 
        IRequestHandler<GetAllProductsRequest, List<Product>>
    {
        public async Task<List<Product>> Handle(
            GetAllProductsRequest request, 
            CancellationToken cancellationToken)
        {
            await Task.Delay(1);
            
            return new List<Product>() 
            {
                new(
                    1,
                    "Tshirt",
                    30.20,
                    "cool tshirt",
                    "clothes",
                    "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg")
            };
        }
    }
}
