using Karusc.Server.Domain.Products;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Karusc.Server.Infrastructure.EntityConfigurations.Products
{
    internal class ProductConfiguration : IEntityTypeConfiguration<Product>
    {
        public void Configure(EntityTypeBuilder<Product> builder)
        {
            builder.HasKey(p => p.Id);
            
            builder.HasMany(p => p.Images)
                .WithOne(i => i.Entity)
                .HasForeignKey(f => f.EntityId);

            builder.Property(p => p.Title).IsRequired();
            builder.Property(p => p.Price).HasPrecision(7, 2);
            builder.HasMany(p => p.Categories).WithMany(c => c.Products);
            builder.HasMany(p => p.Collections).WithMany(c => c.Products);
        }
    }
}
