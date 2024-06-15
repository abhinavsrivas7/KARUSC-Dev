using Karusc.Server.Domain.Users;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Karusc.Server.Infrastructure.EntityConfigurations.Users
{
    internal class WishlistConfiguration : IEntityTypeConfiguration<Wishlist>
    {
        public void Configure(EntityTypeBuilder<Wishlist> builder)
        {
            builder.HasKey(w => w.Id);

            builder
                .HasOne(c => c.Owner)
                .WithOne(u => u.Wishlist)
                .HasForeignKey<Wishlist>(w => w.OwnerId)
                .IsRequired();

            builder
                .HasMany(w => w.Products)
                .WithMany();
        }
    }
}
