using Karusc.Server.Application.Contracts;
using Karusc.Server.Domain;
using Microsoft.EntityFrameworkCore;

namespace Karusc.Server.Infrastructure.Persistence
{
    public class KaruscDbContext : DbContext, IKaruscDbContext
    {
        public KaruscDbContext(DbContextOptions<KaruscDbContext> options) : base(options) { }
        public DbSet<Product> Products { get; set; }
    }
}
