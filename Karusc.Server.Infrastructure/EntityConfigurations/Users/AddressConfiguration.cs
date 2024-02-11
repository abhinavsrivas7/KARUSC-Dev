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
            builder.Property(r => r.Recipient).IsRequired();
            builder.Property(r => r.Line1).IsRequired();
            builder.Property(r => r.City).IsRequired();
            builder.Property(r => r.State).IsRequired();
            builder.Property(r => r.Country).IsRequired();
            builder.Property(r => r.Pincode).IsRequired();
            builder.Property(r => r.Phone).IsRequired();

            builder.HasOne(r => r.User)
                .WithMany(u => u.Addresses)
                .HasForeignKey(r => r.UserId)
                .IsRequired();
        }
    }
}
