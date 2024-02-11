using Karusc.Server.Domain.File;
using Karusc.Server.Domain.Product;
using Karusc.Server.Domain.UI;
using Karusc.Server.Domain.User;
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
        Task<int> SaveChangesAsync(CancellationToken cancellationToken);
    }
}
