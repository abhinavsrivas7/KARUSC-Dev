using Karusc.Server.Domain.Users;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Karusc.Server.Infrastructure.EntityConfigurations.Users
{
    internal class AddressConfiguration : IEntityTypeConfiguration<Address>
    {
        public void Configure(EntityTypeBuilder<Address> builder)
        {
            builder.HasKey(r => r.Id);
            builder.Property(r => r.Recipient).IsRequired().HasMaxLength(40);
            builder.Property(r => r.Line1).IsRequired().HasMaxLength(20);
            builder.Property(r => r.City).IsRequired().HasMaxLength(20);
            builder.Property(r => r.State).IsRequired().HasMaxLength(20);
            builder.Property(r => r.Country).IsRequired().HasMaxLength(20);
            builder.Property(r => r.Pincode).IsRequired().HasMaxLength(6);
            builder.Property(r => r.Phone).IsRequired().HasMaxLength(14);

            builder.HasOne(r => r.User)
                .WithMany(u => u.Addresses)
                .HasForeignKey(r => r.UserId)
                .IsRequired();
        }
    }
}
