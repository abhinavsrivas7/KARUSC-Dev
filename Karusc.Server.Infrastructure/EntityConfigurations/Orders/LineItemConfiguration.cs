using Karusc.Server.Domain.Orders;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Karusc.Server.Infrastructure.EntityConfigurations.Orders
{
    internal static class LineItemConfiguration
    {
        internal static void AddLineItemConfiguration<T>(
            this EntityTypeBuilder<LineItem<T>> builder) where T : LineItemEntity<T>
        {
            string entityName = typeof(T) == typeof(Cart)
                ? nameof(Cart)
                : nameof(Order);

            builder.HasKey(l => l.Id);

            builder
                .HasOne(l => l.Product)
                .WithMany()
                .HasForeignKey(l => l.ProductId)
                .IsRequired();

            builder.Property(l => l.Quantity).IsRequired();

            builder.ToTable(b => b.HasCheckConstraint(
                $"{entityName}LineItem_Quantity_Check",
                "Quantity >= 1 AND Quantity <= 5"));

            builder
                .HasOne(l => l.Parent)
                .WithMany(e => e.LineItems)
                .HasForeignKey(l => l.ParentId)
                .IsRequired();

            builder
                .Property(l => l.ParentId)
                .HasColumnName($"{entityName}Id");
        }
    }
}