using Karusc.Server.Domain.Product;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Karusc.Server.Infrastructure.EntityConfigurations
{
    internal class ProductConfiguration : IEntityTypeConfiguration<Product>
    {
        public void Configure(EntityTypeBuilder<Product> builder)
        {
            builder.HasKey(p => p.Id);
            builder.HasMany(p => p.Images).WithOne(i => i.Entity);
            builder.Property(p => p.Title).IsRequired();
            builder.Property(p => p.Price).HasPrecision(7, 2);
        }
    }
}
