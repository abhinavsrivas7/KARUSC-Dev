using Karusc.Server.Domain.Orders;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Karusc.Server.Infrastructure.EntityConfigurations.Orders
{
    internal class CartLineItemConfiguration : IEntityTypeConfiguration<LineItem<Cart>>
    {
        public void Configure(EntityTypeBuilder<LineItem<Cart>> builder)
        {
            builder.AddLineItemConfiguration();
        }
    }
}
