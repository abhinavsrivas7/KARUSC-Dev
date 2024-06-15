using Karusc.Server.Domain.LineItemEntities;
using Karusc.Server.Domain.Products;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Karusc.Server.Infrastructure.EntityConfigurations.Orders
{
    internal static class LineItemConfiguration
    {
        internal static void AddLineItemConfiguration<T>(this EntityTypeBuilder<LineItem<T>> builder) 
            where T : LineItemEntity<T>
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
                $"{entityName}{nameof(LineItem<T>)}_{nameof(LineItem<T>.Quantity)}_Check",
                $"{nameof(LineItem<T>.Quantity)} >= {LineItem<T>.QuantityLimits.Min} AND " +
                $"{nameof(LineItem<T>.Quantity)} <= {LineItem<T>.QuantityLimits.Max}"));

            builder
                .HasOne(l => l.Parent)
                .WithMany(e => e.LineItems)
                .HasForeignKey(l => l.ParentId)
                .IsRequired();

            builder
                .Property(l => l.ParentId)
                .HasColumnName($"{entityName}Id");

            builder
                .HasIndex(
                    l => new { l.ProductId, l.ParentId }, 
                    $"One-{nameof(LineItem<T>)}-per-{nameof(Product)}-per-{entityName}")
                .IsUnique();
        }
    }
}