using Karusc.Server.Application.Categories;
using Karusc.Server.Application.Collections;
using Karusc.Server.Domain;
using System.Linq.Expressions;

namespace Karusc.Server.Application.Products
{
    internal static class ProductSelector
    {
        internal static Expression<Func<Product, ProductDto>> Expression =>
            product => new ProductDto(
                    product.Id,
                    product.Title,
                    product.Price,
                    product.Description,
                    product.Images!.Select(image => image.FileName).ToList(),
                    product.Categories!
                        .Select(category => new CategoryDto(
                            category.Id,
                            category.Name,
                            category.ImageURL!))
                        .ToList(),
                    product.Collections!
                        .Select(collection => new CollectionDTO(
                            collection.Id,
                            collection.Name,
                            collection.ImageURL!))
                        .ToList());
    }
}
