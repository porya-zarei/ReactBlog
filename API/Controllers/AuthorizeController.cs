using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using API.APIDataLayer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthorizeController : ControllerBase
    {
        private IUserRepository userRepository;
        public IConfiguration _configuration;

        public AuthorizeController(EinsteinContext db,IConfiguration configuration)
        {
            userRepository = new UserRepository(db);
            _configuration = configuration;
        }
        [Authorize]
        [HttpGet]
        public ActionResult<IEnumerable<User>> GetTopUsers()
        {
            var topUsers = userRepository.TopUsers();
            return Ok(topUsers);
        }

        [HttpPost]
        public ActionResult<User> LoginUser(LoginUser loginUser)
        {
            try
            {
                if(loginUser!=null && loginUser.Email != null && loginUser.Password != null)
                {
                    var (user, res) = userRepository.GetUserInLogin(loginUser);
                    if (user != null)
                    {
                        var claims = new[]
                        {                            
                            new Claim(JwtRegisteredClaimNames.Jti,_configuration["Jwt:Subject"]),
                            new Claim(JwtRegisteredClaimNames.Iat,Guid.NewGuid().ToString()),
                            new Claim(JwtRegisteredClaimNames.Sub,DateTime.UtcNow.ToString()),
                            new Claim("Identity",user.Identity.ToString()),
                            new Claim("FullName",user.FullName.ToString()),
                            new Claim("Email",user.Email.ToString()),
                            new Claim("Password",user.Password.ToString()),
                            new Claim("Role",user.Role.ToString())
                        };
                        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
                        var SignIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
                        var token = new JwtSecurityToken(
                            _configuration["Jwt:Issuer"],
                            _configuration["Jwt:Audience"],
                            claims,
                            expires:DateTime.Now.AddHours(5),
                            signingCredentials:SignIn
                        );
                        var t = new JwtSecurityTokenHandler().WriteToken(token);
                        Response.Cookies.Append("Token",t, new CookieOptions { Expires = DateTime.Now.AddHours(5) ,HttpOnly=true,Path="/",SameSite=SameSiteMode.Strict });
                        return Ok(t);
                    }
                    else if (res == "password incorrect")
                    {
                        return BadRequest();
                    }
                    else
                    {
                        return NotFound();
                    }
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception)
            {

                return NotFound();
            }
        }
    }
}
