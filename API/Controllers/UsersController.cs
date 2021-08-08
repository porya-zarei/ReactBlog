using System.Xml.Schema;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API.APIDataLayer;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using Microsoft.Extensions.Configuration;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private IUserRepository userRepository;
        public IConfiguration _configuration;

        public UsersController(EinsteinContext db, IConfiguration configuratio)
        {
            userRepository = new UserRepository(db);
            _configuration = configuratio;
        }

        // GET: api/Users
        [HttpGet]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public ActionResult<IEnumerable<User>> GetUsers()
        {
            var id = User.Claims.Where(c => c.Type == "Identity").First().Value;
            bool isAdmin = userRepository.IsAdmin(id);
            if (!isAdmin)
            {
                return BadRequest();
            }
            return userRepository.GetAllUsers().ToList();
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public ActionResult<User> GetUser(string identity)
        {
            var user = userRepository.GetUserByIdentity(identity);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        // PUT: api/Users/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("update")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public IActionResult PutUser(User user)
        {
            string userIdentity = User.Claims.Where(c => c.Type == "Identity").First().Value;
            var fullUser = userRepository.GetUserByIdentity(userIdentity);
            user.Role = fullUser.Role;
            user.Posts = fullUser.Posts;
            bool currentUser = (fullUser.Identity == userIdentity);
            if (!currentUser)
            {
                return BadRequest();
            }

            try
            {
                userRepository.UpdateUser(user);
                userRepository.Save();

                var newUser = userRepository.GetUserByIdentity(user.Identity);

                var claims = new[]
                            {
                            new Claim(JwtRegisteredClaimNames.Jti,_configuration["Jwt:Subject"]),
                            new Claim(JwtRegisteredClaimNames.Iat,Guid.NewGuid().ToString()),
                            new Claim(JwtRegisteredClaimNames.Sub,DateTime.UtcNow.ToString()),
                            new Claim("Identity",user.Identity.ToString()),
                            new Claim("FullName",newUser.FullName.ToString()),
                            new Claim("Email",newUser.Email.ToString()),
                            new Claim("Password",newUser.Password.ToString()),
                            new Claim("Role",user.Role.ToString())
                        };
                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
                var SignIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
                var token = new JwtSecurityToken(
                    _configuration["Jwt:Issuer"],
                    _configuration["Jwt:Audience"],
                    claims,
                    expires: DateTime.Now.AddHours(5),
                    signingCredentials: SignIn
                );

                var t = new JwtSecurityTokenHandler().WriteToken(token);
                Response.Cookies.Append("Token", t, new CookieOptions { Expires = DateTime.Now.AddHours(5), HttpOnly = true, Path = "/", SameSite = SameSiteMode.Strict });
                return Ok(t);
            }
            catch (DbUpdateConcurrencyException)
            {
                return NotFound();
            }
        }

        [HttpPut("updatebyadmin")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public IActionResult AdminUpdate(User user)
        {
            var id = User.Claims.Where(c => c.Type == "Identity").First().Value;
            bool isAdmin = userRepository.IsAdmin(id);
            if (!isAdmin)
            {
                return BadRequest();
            }

            try
            {
                userRepository.UpdateUser(user);
                userRepository.Save();

                return Ok(userRepository.GetAllUsers());
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(user.Identity))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
        }

        // POST: api/Users
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public ActionResult<User> PostUser(User newUser)
        {
            try
            {
                var userNotExist = !userRepository.CheckUser(newUser.Email);
                if (userNotExist)
                {
                    newUser.Identity = Guid.NewGuid().ToString();
                    userRepository.AddUser(newUser);
                    userRepository.Save();
                    EmailSender newEmail = new EmailSender();
                    string emailContent = @$"
                            <div style='background-color:dark;color:white;padding:10px;margin:5px'>
                            <span>سلام دوست عزیز <b>{newUser.FullName}</b></span>
                            <p>از عضویت شما در این وبسایت بسیار ممنونم</p>
                            <br />
                            <hr />
                            <span>
                            اگر شما این فعالیت را انجام نداده اید جای نگرانی نیست
                            فردی از نام ایمیل شما استفاده کرده است
                            </span>
                            </div>
                            ";
                    newEmail.Send(newUser.Email, "PZE Website", emailContent);
                    var loged = new LoginUser { Email = newUser.Email, Password = newUser.Password };
                    var (user, res) = userRepository.GetUserInLogin(loged);
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
                        expires: DateTime.Now.AddHours(5),
                        signingCredentials: SignIn
                    );
                    var t = new JwtSecurityTokenHandler().WriteToken(token);
                    Response.Cookies.Append("Token", t, new CookieOptions { Expires = DateTime.Now.AddHours(5), HttpOnly = true, Path = "/", SameSite = SameSiteMode.Strict });
                    return Ok(t);
                }
                else
                {
                    return (BadRequest());
                }
            }
            catch (Exception)
            {
                return (NotFound());
            }
        }

        // DELETE: api/Users/5
        [HttpDelete]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public ActionResult<User> DeleteUser(string identity)
        {
            var user = userRepository.GetUserByIdentity(identity);

            if (user == null)
            {
                return NotFound();
            }

            userRepository.DeleteUser(user);
            userRepository.Save();

            return user;
        }

        private bool UserExists(string identity)
        {
            if (userRepository.GetUserByIdentity(identity) != null)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
    }
}