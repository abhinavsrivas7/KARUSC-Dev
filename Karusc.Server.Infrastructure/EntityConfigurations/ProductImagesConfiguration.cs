using Karusc.Server.Domain.File;
using Karusc.Server.Domain.Product;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Karusc.Server.Infrastructure.EntityConfigurations
{
    internal class ProductImagesConfiguration : IEntityTypeConfiguration<File<Product>>
    {
        public void Configure(EntityTypeBuilder<File<Product>> builder)
        {
            builder.Ignore(f => f.FileBase64);
            builder.HasKey(f => f.Id);
            builder.HasOne(f => f.Entity)
                .WithMany(p => p.Images)
                .HasForeignKey(f => f.EntityId)
                .IsRequired();
        }
    }
}
