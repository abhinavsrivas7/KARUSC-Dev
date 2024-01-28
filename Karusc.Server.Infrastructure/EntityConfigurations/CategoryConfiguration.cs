using Karusc.Server.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Karusc.Server.Infrastructure.EntityConfigurations
{
    internal class CategoryConfiguration : IEntityTypeConfiguration<Category>
    {
        public void Configure(EntityTypeBuilder<Category> builder)
        {
            builder.HasKey(c => c.Id);
            builder.Ignore(c => c.Image);
            builder.HasMany(c => c.Products).WithMany(p => p.Categories);
            builder.Property(c => c.Name).IsRequired();
            builder.Property(c => c.ImageURL).IsRequired();
        }
    }
}
