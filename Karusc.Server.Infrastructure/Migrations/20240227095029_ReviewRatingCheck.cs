using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Karusc.Server.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class ReviewRatingCheck : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddCheckConstraint(
                name: "Review_Rating_Check",
                table: "Reviews",
                sql: "Rating >= 1 AND Rating <= 5");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropCheckConstraint(
                name: "Review_Rating_Check",
                table: "Reviews");
        }
    }
}
