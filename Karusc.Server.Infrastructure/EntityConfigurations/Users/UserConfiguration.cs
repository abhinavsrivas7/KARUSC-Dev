using Karusc.Server.Domain.LineItemEntities;
using Karusc.Server.Domain.Users;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Karusc.Server.Infrastructure.EntityConfigurations.Users
{
    internal class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.HasKey(u => u.Id);
            builder.HasIndex(u => u.Email).IsUnique();
            builder.Ignore(u => u.ProfilePicture);
            builder.Property(u => u.Email).IsRequired();
            builder.Property(u => u.Name).IsRequired();
            builder.Property(u => u.ProfilePictureURL).IsRequired();
            builder.Property(u => u.Role).IsRequired();
            
            builder.HasMany(u => u.Addresses)
                .WithOne(a => a.User)
                .HasForeignKey(a => a.UserId);

            builder.HasMany(u => u.Reviews)
                .WithOne(r => r.Author)
                .HasForeignKey(r => r.AuthorId);

            builder
                .HasOne(u => u.Cart)
                .WithOne(c => c.Owner)
                .HasForeignKey<Cart>(c => c.OwnerId);

            builder.HasMany(u => u.Orders).WithOne(o => o.Owner);
        }
    }
}
