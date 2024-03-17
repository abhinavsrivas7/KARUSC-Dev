using Karusc.Server.Application.Products;
using Karusc.Server.Domain.Orders;

namespace Karusc.Server.Application.Carts
{
    internal record LineItemDto<T>(Guid Id, ProductDto Product, int Quantity) where T : LineItemEntity<T>
    {
        internal LineItemDto(LineItem<T> lineItem): this(
            lineItem.Id, 
            new ProductDto(lineItem.Product!), 
            lineItem.Quantity) {}

        internal LineItemDto<T> EnrichProductImages(string enrichmentPrefix) => this with
        {
            Product = Product.EnrichImageNames(enrichmentPrefix)
        };
    }
}
