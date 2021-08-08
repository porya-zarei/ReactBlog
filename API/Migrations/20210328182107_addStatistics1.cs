using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class addStatistics1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "DaysVisitors",
                columns: table => new
                {
                    Time = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    Visits = table.Column<long>(type: "bigint", nullable: false),
                    IPs = table.Column<List<string>>(type: "text[]", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DaysVisitors", x => x.Time);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DaysVisitors");
        }
    }
}
