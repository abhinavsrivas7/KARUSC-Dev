using Karusc.Server.Domain.Orders;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Karusc.Server.Infrastructure.EntityConfigurations.Orders
{
    internal class CartConfiguration : IEntityTypeConfiguration<Cart>
    {
        public void Configure(EntityTypeBuilder<Cart> builder)
        {
            builder.AddLineItemEntityConfiguration();
        }
    }
}
