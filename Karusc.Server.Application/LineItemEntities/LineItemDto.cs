using Karusc.Server.Application.Products;
using Karusc.Server.Domain.LineItemEntities;

namespace Karusc.Server.Application.LineItemEntities
{
    internal record LineItemDto<T>(Guid Id, ProductDto Product, int Quantity) where T : LineItemEntity<T>
    {
        internal LineItemDto(LineItem<T> lineItem): this(
            lineItem.Id,
            new(lineItem.Product),
            lineItem.Quantity) { }

        internal LineItemDto<T> EnrichProductImages(string enrichmentPrefix) => this with
        {
            Product = Product.EnrichImageNames(enrichmentPrefix)
        };
    };
}
