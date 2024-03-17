using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Karusc.Server.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddedUniqueLineItemPerProductPerEntityIndices : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "CartId",
                table: "Users",
                type: "char(36)",
                nullable: true,
                collation: "ascii_general_ci");

            migrationBuilder.CreateIndex(
                name: "One-LineItem-per-Product-per-Order",
                table: "OrderLineItems",
                columns: new[] { "ProductId", "OrderId" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "One-LineItem-per-Product-per-Cart",
                table: "CartLineItems",
                columns: new[] { "ProductId", "CartId" },
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "One-LineItem-per-Product-per-Order",
                table: "OrderLineItems");

            migrationBuilder.DropIndex(
                name: "One-LineItem-per-Product-per-Cart",
                table: "CartLineItems");

            migrationBuilder.DropColumn(
                name: "CartId",
                table: "Users");

            migrationBuilder.CreateIndex(
                name: "IX_OrderLineItems_ProductId",
                table: "OrderLineItems",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_CartLineItems_ProductId",
                table: "CartLineItems",
                column: "ProductId");
        }
    }
}
