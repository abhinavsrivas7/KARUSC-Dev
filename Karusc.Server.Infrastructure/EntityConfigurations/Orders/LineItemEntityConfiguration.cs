﻿using Karusc.Server.Domain.LineItemEntities;
using Karusc.Server.Domain.Users;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Karusc.Server.Infrastructure.EntityConfigurations.Orders
{
    internal static class LineItemEntityConfiguration
    { 
        internal static void AddLineItemEntityConfiguration<T>(this EntityTypeBuilder<T> builder) 
            where T : LineItemEntity<T>
        {
            builder.HasKey(e => e.Id);
            
            if(typeof(T) == typeof(Cart))
            {
                builder
                    .HasOne(c => c.Owner)
                    .WithOne(nameof(User.Cart))
                    .HasForeignKey<Cart>(c => c.OwnerId)
                    .IsRequired();
            }
            else
            {
                builder
                    .HasOne(o => o.Owner)
                    .WithMany(nameof(User.Orders))
                    .HasForeignKey(o => o.OwnerId)
                    .IsRequired();
            }

            builder.HasMany(e => e.LineItems).WithOne(l => l.Parent);
        }
    }
}