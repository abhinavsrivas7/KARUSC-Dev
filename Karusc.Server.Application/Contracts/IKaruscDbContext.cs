using Karusc.Server.Domain.Files;
using Karusc.Server.Domain.Products;
using Karusc.Server.Domain.Reviews;
using Karusc.Server.Domain.UI;
using Karusc.Server.Domain.Users;
using Microsoft.EntityFrameworkCore;

namespace Karusc.Server.Application.Contracts
{
    public interface IKaruscDbContext
    {
        DbSet<Product> Products { get; set; }
        DbSet<File<Product>> ProductImages { get; set; }
        DbSet<Category> Categories { get; set; }
        DbSet<Collection> Collections { get; set; }
        DbSet<HomeCarouselImage> HomeCarouselImages { get; set; }
        DbSet<User> Users { get; set; }
        DbSet<Address> Addresses { get; set; }
        DbSet<Review> Reviews { get; set; }
        Task<int> SaveChangesAsync(CancellationToken cancellationToken);
    }
}
