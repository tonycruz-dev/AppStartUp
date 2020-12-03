using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Infrastructure.Data.Migrations
{
    public partial class ViewsUsersMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(
                @"CREATE VIEW dbo.View_UsersAndRoules AS
                       SELECT  a.Id, a.UserName, a.NickName, 
                        t0.Name, t0.UserId,a.Email, t0.RoleId, t0.Id AS RoleId2
                       FROM  dbo.AspNetUsers AS a LEFT OUTER JOIN (
                       SELECT t.Name, a0.UserId, a0.RoleId, t.Id FROM dbo.AspNetUserRoles AS a0 
                       INNER JOIN (
                       SELECT Id, Name FROM dbo.AspNetRoles AS a1) AS 
                       t ON a0.RoleId = t.Id) AS t0 ON a.Id = t0.UserId"
          );

        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("DROP VIEW dbo.View_UsersAndRoules");
        }
    }
}
