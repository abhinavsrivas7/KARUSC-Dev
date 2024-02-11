using Karusc.Server.Domain.UI;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Karusc.Server.Infrastructure.EntityConfigurations.UI
{
    internal class HomeCarouselImageConfiguration 
        : IEntityTypeConfiguration<HomeCarouselImage>
    {
        public void Configure(EntityTypeBuilder<HomeCarouselImage> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Ignore(x => x.Image);
            builder.Property(x => x.ImageURL).IsRequired();
            builder.HasIndex(x => x.ImageURL);
        }
    }
}
