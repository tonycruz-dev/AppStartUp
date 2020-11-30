using API.Core.Entities;
using API.Core.Interfaces;
using API.DTOs;
using API.Errors;
using API.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace API.Controllers
{
    public class AccountController : BaseController
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly ITokenService _tokenService;
        public AccountController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, ITokenService tokenService)
        {
            _tokenService = tokenService;
            _signInManager = signInManager;
            _userManager = userManager;
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            var user = await _userManager.FindByEmailFromClaimsPrinciple(HttpContext.User);

            return new UserDto
            {
                Email = user.Email,
                Token = await _tokenService.CreateTokenAsync(user),
                DisplayName = user.NickName,
                Avatar = user.Avatar,
                Occupation = user.Occupation
            };
        }
        [HttpGet("emailexists")]
        public async Task<ActionResult<bool>> CheckEmailExistsAsync([FromQuery] string email)
        {
            return await _userManager.FindByEmailAsync(email) != null;
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _userManager.FindByEmailAsync(loginDto.Email);

            if (user == null) return Unauthorized(new ApiResponse(401));

            var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

            if (!result.Succeeded) return Unauthorized(new ApiResponse(401));

            return new UserDto
            {
                Email = user.Email,
                Token = await _tokenService.CreateTokenAsync(user),
                DisplayName = user.NickName,
                Avatar = user.Avatar,
                Occupation = user.Occupation
            };
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> RegisterClient(RegisterDto registerDto)
        {
            var user = new AppUser
            {
                NickName = registerDto.DisplayName,
                Email = registerDto.Email,
                UserName = registerDto.Email,
                Occupation = "manager",
                Avatar = "https://res.cloudinary.com/dbalg7dya/image/upload/v1593803393/PlaceOrder_fkjr9a.png"

            };

            var result = await _userManager.CreateAsync(user, registerDto.Password);

            if (!result.Succeeded) return BadRequest(new ApiResponse(400));

            var roleResult = await _userManager.AddToRoleAsync(user, "Member");

            if (!roleResult.Succeeded) return BadRequest(result.Errors);

            return new UserDto
            {
                DisplayName = user.NickName,
                Token = await _tokenService.CreateTokenAsync(user),
                Email = user.Email,
                Avatar = user.Avatar,
                Occupation = user.Occupation,
            };
        }
    }
}
