using Karusc.Server.Domain.LineItemEntities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Karusc.Server.Infrastructure.EntityConfigurations.Orders
{
    internal class OrderConfiguration : IEntityTypeConfiguration<Order>
    {
        public void Configure(EntityTypeBuilder<Order> builder)
        {
            builder.AddLineItemEntityConfiguration();
            builder.HasIndex(o => o.Status);
            builder.Property(o => o.Status).IsRequired();

            builder
                .HasOne(o => o.Address)
                .WithMany()
                .HasForeignKey(o => o.AddressId);
        }
    }
}