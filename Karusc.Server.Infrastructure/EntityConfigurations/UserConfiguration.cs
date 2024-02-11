using Karusc.Server.Domain.User;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Karusc.Server.Infrastructure.EntityConfigurations
{
    internal class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.HasKey(u => u.Id);
            builder.HasIndex(u => u.Email);
            builder.Ignore(u => u.ProfilePicture);
            builder.Property(u => u.Email).IsRequired();
            builder.Property(u => u.ProfilePictureURL).IsRequired();
            builder.Property(u => u.Role).IsRequired();
        }
    }
}
