using Karusc.Server.Domain.Orders;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Karusc.Server.Infrastructure.EntityConfigurations.Orders
{
    internal class OrderConfiguration : IEntityTypeConfiguration<Order>
    {
        public void Configure(EntityTypeBuilder<Order> builder)
        {
            builder.AddLineItemEntityConfiguration();

            builder
                .HasOne(o => o.Address)
                .WithMany()
                .HasForeignKey(o => o.AddressId);
        }
    }
}
