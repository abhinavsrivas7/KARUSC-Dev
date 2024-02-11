using Karusc.Server.Application.Contracts;
using Karusc.Server.Domain.Files;
using Karusc.Server.Domain.Products;
using Karusc.Server.Domain.Reviews;
using Karusc.Server.Domain.UI;
using Karusc.Server.Domain.Users;
using Microsoft.EntityFrameworkCore;

namespace Karusc.Server.Infrastructure.Persistence
{
    public class KaruscDbContext : DbContext, IKaruscDbContext
    {
        public KaruscDbContext(DbContextOptions<KaruscDbContext> options) : base(options) { }
        public DbSet<Product> Products { get; set; }
        public DbSet<File<Product>> ProductImages { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Collection> Collections { get; set; }
        public DbSet<HomeCarouselImage> HomeCarouselImages { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Address> Addresses { get; set; }
        public DbSet<Review> Reviews { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(KaruscDbContext).Assembly);
        }
    }
}
