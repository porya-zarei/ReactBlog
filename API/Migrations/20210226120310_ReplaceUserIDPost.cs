using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class ReplaceUserIDPost : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "UserIdentity",
                table: "Posts",
                newName: "Identity");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Identity",
                table: "Posts",
                newName: "UserIdentity");
        }
    }
}
