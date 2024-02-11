using Karusc.Server.Domain.Products;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Karusc.Server.Infrastructure.EntityConfigurations.Products
{
    internal class CollectionConfiguration : IEntityTypeConfiguration<Collection>
    {
        public void Configure(EntityTypeBuilder<Collection> builder)
        {
            builder.HasKey(c => c.Id);
            builder.HasIndex(c => c.Name);
            builder.Ignore(c => c.Image);
            builder.HasMany(c => c.Products).WithMany(p => p.Collections);
            builder.Property(c => c.Name).IsRequired();
        }
    }
}
