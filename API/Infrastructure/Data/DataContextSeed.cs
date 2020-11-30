using API.Core.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;

namespace API.Infrastructure.Data
{
    public class DataContextSeed
    {
        public static async Task SeedAsync(DataContext context, UserManager<AppUser> userManager, RoleManager<IdentityRole> roleManager, ILoggerFactory loggerFactory)
        {

            try
            {
                if (await userManager.Users.AnyAsync()) return;

                var userData = await System.IO.File.ReadAllTextAsync("Infrastructure/Data/users.json");
                var users = JsonSerializer.Deserialize<List<UserJson>>(userData);
                if (users == null) return;
                var roles = new List<IdentityRole>
                {
                    new IdentityRole {Name = "Member"},
                    new IdentityRole {Name = "Admin"},
                    new IdentityRole {Name = "Manager"},
                };

                foreach (var role in roles)
                {
                    await roleManager.CreateAsync(role);
                }
                foreach (var user in users)
                {
                    AppUser appUser = new AppUser
                    {
                        UserName = user.UserName.ToLower(),
                        Email = user.email,
                        Occupation = user.occupation,
                        Avatar = user.avatar,
                        NickName = user.nickName
                    };
                    await userManager.CreateAsync(appUser, "Pa$$w0rd");
                    await userManager.AddToRoleAsync(appUser, "Member");                   
                }

                var admin = new AppUser
                {
                    UserName = "admin",
                    Email = "admin@me.com",
                    Occupation = "admin",
                    Avatar = "https://res.cloudinary.com/dbalg7dya/image/upload/v1593803393/PlaceOrder_fkjr9a.png",
                    NickName = "Admin"
                };

                await userManager.CreateAsync(admin, "Pa$$w0rd");
                await userManager.AddToRolesAsync(admin, new[] { "Admin", "Manager", "Manager" });

                var customerData = await System.IO.File.ReadAllTextAsync("Infrastructure/Data/Customers.json");
                var customers = JsonSerializer.Deserialize<List<CustomerJson>>(customerData);

                foreach (var item in customers)
                {
                    var user = await userManager.FindByEmailAsync(item.AccountEmail);
                    var customer = new Customer
                    {
                        CustomerName = item.CustomerName,
                        CompanyName = item.CompanyName,
                        Address1 = item.Address1,
                        Address2 = item.Address2,
                        Address3 = item.Address3,
                        Address4 = item.Address4,
                        Address5 = item.Address5,
                        DateOfBirth = DateTime.Parse(item.DateOfBirth),
                        Gender = item.Gender,
                        Discontinued = item.Discontinued,
                        PhotoUrl = item.PhotoUrl,
                        NoteInfo = "",
                        AppUser = user,
                        AppUserId = user.Id

                    };
                    context.Customers.Add(customer);
                    await context.SaveChangesAsync();
                }
                
            }
            catch (Exception ex)
            {

                var logger = loggerFactory.CreateLogger<DataContext>();
                logger.LogError(ex.Message);
            }
        }
    }
}
