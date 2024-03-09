using Karusc.Server.Domain.Orders;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Karusc.Server.Infrastructure.EntityConfigurations.Orders
{
    internal class OrderLineItemConfiguration : IEntityTypeConfiguration<LineItem<Order>>
    {
        public void Configure(EntityTypeBuilder<LineItem<Order>> builder)
        {
            builder.AddLineItemConfiguration();
        }
    }
}
