using Karusc.Server.Application.Categories;
using Karusc.Server.Application.Collections;
using Karusc.Server.Domain.Product;
using System.Linq.Expressions;

namespace Karusc.Server.Application.Products
{
    internal static class ProductExpressions
    {
        internal static Expression<Func<Product, ProductDto>> Selector =>
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

        internal static Expression<Func<Product, bool>> Filter(
            HashSet<Guid> categories,
            HashSet<Guid> collections) => categories.Any() && collections.Any()
            ? product => 
                product.Categories!.Any(category => categories.Contains(category.Id)) &&
                product.Collections!.Any(collection => collections.Contains(collection.Id))
            : categories.Any() && !collections.Any()
            ? product => product.Categories!.Any(category => categories.Contains(category.Id))
            : collections.Any() && !categories.Any()
            ? product => product.Collections!.Any(collection => collections.Contains(collection.Id))
            : product => true;


    }
}
