using Karusc.Server.Domain.Files;
using Karusc.Server.Domain.Orders;
using Karusc.Server.Domain.Products;
using Karusc.Server.Domain.Reviews;
using Karusc.Server.Domain.UI;
using Karusc.Server.Domain.Users;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;

namespace Karusc.Server.Application.Contracts
{
    public interface IKaruscDbContext
    {
        DatabaseFacade Database {  get; }
        DbSet<Product> Products { get; set; }
        DbSet<File<Product>> ProductImages { get; set; }
        DbSet<Category> Categories { get; set; }
        DbSet<Collection> Collections { get; set; }
        DbSet<HomeCarouselImage> HomeCarouselImages { get; set; }
        DbSet<User> Users { get; set; }
        DbSet<Address> Addresses { get; set; }
        DbSet<Review> Reviews { get; set; }
        DbSet<Order> Orders { get; set; }
        DbSet<Cart> Carts { get; set; }
        DbSet<LineItem<Order>> OrderLineItems { get; set; }
        DbSet<LineItem<Cart>> CartLineItems { get; set; }
        Task<int> SaveChangesAsync(CancellationToken cancellationToken);       
        DbSet<TEntity> Set<TEntity>() where TEntity : class;
    }
}
