using Karusc.Server.Domain.Products;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Karusc.Server.Infrastructure.EntityConfigurations.Products
{
    internal class CategoryConfiguration : IEntityTypeConfiguration<Category>
    {
        public void Configure(EntityTypeBuilder<Category> builder)
        {
            builder.HasKey(c => c.Id);
            builder.HasIndex(c => c.Name);
            builder.Ignore(c => c.Image);
            builder.HasMany(c => c.Products).WithMany(p => p.Categories);
            builder.Property(c => c.Name).IsRequired();
            builder.Property(c => c.ImageURL).IsRequired();
        }
    }
}
