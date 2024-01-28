using Karusc.Server.Domain;
using Microsoft.EntityFrameworkCore;

namespace Karusc.Server.Application.Contracts
{
    public interface IKaruscDbContext
    {
        DbSet<Product> Products { get; set; }
        DbSet<File<Product>> ProductImages { get; set; }
        DbSet<Category> Categories { get; set; }
        Task<int> SaveChangesAsync(CancellationToken cancellationToken);
    }
}
