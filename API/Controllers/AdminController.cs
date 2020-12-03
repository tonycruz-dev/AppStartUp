using API.Core.Entities;
using API.DTOs;
using API.Infrastructure.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
   
    public class AdminController : BaseController
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly DataContext _context;

        public AdminController(UserManager<AppUser> userManager, DataContext context)
        {
            _userManager = userManager;
            _context = context;
        }

        [Authorize()]
        [HttpGet("users-with-roles")]
        public async Task<ActionResult> GetUsersWithRoles()
        {
            var viewUsers = _context.View_UsersAndRoules;
            var userList = viewUsers.ToList();
            //AdminUserRoleDto
            var userToreturn = new List<AdminListDto>();
            foreach (var item in userList)
            {
                if (userToreturn.Count > 0)
                {
                   var checkUser = userToreturn.SingleOrDefault(u => u.Id == item.UserId);
                    if (checkUser is null)
                    {
                        var itemToAdd = new AdminListDto
                        {
                            Id = item.Id,
                            UserName = item.UserName,
                            NickName = item.NickName
                        };
                        itemToAdd.Roles.Add(item.Name);

                        userToreturn.Add(itemToAdd);
                    }
                    else
                    {
                        checkUser.Roles.Add(item.Name);
                    }
                }
                else
                {
                    var itemToAdd = new AdminListDto
                    {
                        Id = item.Id,
                        UserName = item.UserName,
                        NickName = item.NickName
                    };
                    itemToAdd.Roles.Add(item.Name);

                    userToreturn.Add(itemToAdd);
                }
               
            }
            

            var users = await _userManager.Users
                .Include(r => r.UserRoles)
                .ThenInclude(r => r.Role)
                .OrderBy(u => u.UserName)
                .Select(u => new
                {
                    u.Id,
                    Username = u.UserName,
                    Roles = u.UserRoles.Select(r => r.Role.Name).ToList()
                })
                .ToListAsync();

            return Ok(userToreturn);
        }

        //[Authorize()]
        //[HttpGet("users-with-roles")]
        //public async Task<ActionResult> GetUsersWithRoles()
        //{

        //    var sql = @"SELECT [a].[Id], [a].[NickName], [t0].[Name], [t0].[UserId], [t0].[RoleId], [t0].[Id]
        //                FROM [AspNetUsers] AS [a]
        //                LEFT JOIN (
        //                    SELECT [t].[Name], [a0].[UserId], [a0].[RoleId], [t].[Id]
        //                    FROM [AspNetUserRoles] AS [a0]
        //                    INNER JOIN (
        //                        SELECT [a1].[Id], [a1].[Name]
        //                        FROM [AspNetRoles] AS [a1]
        //                    ) AS [t] ON [a0].[RoleId] = [t].[Id]
        //                ) AS [t0] ON [a].[Id] = [t0].[UserId]
        //                ORDER BY [a].[UserName], [a].[Id], [t0].[UserId], [t0].[RoleId], [t0].[Id]";

        //    var dbUser = await _context.Users
        //                 .FromSqlRaw(sql).ToListAsync();
        //    //.ToList();
        //    //var users = await _userManager.Users
        //    //    .Include(r => r.UserRoles)
        //    //    .ThenInclude(r => r.Role)
        //    //    .OrderBy(u => u.UserName)
        //    //    .Select(u => new
        //    //    {
        //    //        u.Id,
        //    //        NickName = u.NickName,
        //    //        Roles = u.UserRoles.Select(r => r.Role.Name).ToList()
        //    //    })
        //    //    .ToListAsync();

        //    // return Ok(users);
        //}

        [Authorize()]
        [HttpPost("edit -roles/{username}")]
        public async Task<ActionResult> EditRoles(string username, [FromQuery] string roles)
        {
            var selectedRoles = roles.Split(",").ToArray();

            var user = await _userManager.FindByNameAsync(username);

            if (user == null) return NotFound("Could not find user");

            var userRoles = await _userManager.GetRolesAsync(user);

            var result = await _userManager.AddToRolesAsync(user, selectedRoles.Except(userRoles));

            if (!result.Succeeded) return BadRequest("Failed to add to roles");

            result = await _userManager.RemoveFromRolesAsync(user, userRoles.Except(selectedRoles));

            if (!result.Succeeded) return BadRequest("Failed to remove from roles");

            return Ok(await _userManager.GetRolesAsync(user));
        }

        [Authorize(Policy = "ModeratePhotoRole")]
        [HttpGet("photos-to-moderate")]
        public ActionResult GetPhotosForModeration()
        {
            return Ok("Admins or moderators can see this");
        }
    }
}
