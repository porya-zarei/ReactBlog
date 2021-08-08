using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API.APIDataLayer;
using API;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostsController : ControllerBase
    {
        private readonly IPostRepository _postRepository;
        private readonly IDayVisitorRepository _dayRepository;
        private IUserRepository userRepository;
        private IMemoryCache memoryCache;
        private readonly IWebHostEnvironment webHostEnvironment;

        public PostsController(EinsteinContext db, IMemoryCache _memoryCache, IWebHostEnvironment _webHostEnvironment)
        {
            _postRepository = new PostRepository(db);
            userRepository = new UserRepository(db);
            _dayRepository = new DayVisitorRepository(db);
            memoryCache = _memoryCache;
            webHostEnvironment = _webHostEnvironment;
        }

        // GET: api/Posts
        [HttpGet]
        public ActionResult<IEnumerable<Post>> GetPosts()
        {
            List<Post> posts;
            bool AlreadyExist = memoryCache.TryGetValue("CachedPosts", out posts);

            if (!AlreadyExist)
            {
                posts = _postRepository.GetAllPosts().ToList();

                var cacheEntryOption = new MemoryCacheEntryOptions()
                    .SetSlidingExpiration(TimeSpan.FromSeconds(20));

                cacheEntryOption.AbsoluteExpirationRelativeToNow = TimeSpan.FromSeconds(600);

                memoryCache.Set("CachedPosts", posts, cacheEntryOption);
            }

            _dayRepository.AddToVisitors();

            return posts;
        }

        // GET: api/Posts/5
        [HttpGet("{id}")]
        public ActionResult<Post> GetPost(int id)
        {
            var post = _postRepository.GetPostById(id);

            //post.User = userRepository.GetUserById(post.UserID);

            if (post == null)
            {
                return NotFound();
            }

            return Ok(post);
        }

        // PUT: api/Posts/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<ActionResult> PutPost(int id, [FromForm] FullPost full)
        {
            try
            {
                var identity = User.Claims.Where(c => c.Type == "Identity").First().Value;
                var post = full.MapToPost();
                var image = full.image;

                if (id != post.PostID)
                    return BadRequest();

                if (post != null && userRepository.IsAdmin(identity))
                {
                    string imageName = null;

                    if (image != null)
                    {
                        var up = new Uploading();
                        imageName = await up.UploadImageForPost(image, webHostEnvironment);
                    }

                    if (!string.IsNullOrEmpty(imageName))
                        post.ImageName = imageName;

                    var newPost = await _postRepository.UpdatePost(post);
                    return Ok(newPost);
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        // POST: api/Posts
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<ActionResult<Post>> PostPost([FromForm] FullPost full)
        {
            try
            {
                var id = User.Claims.Where(c => c.Type == "Identity").First().Value;

                var post = full.MapToPost();
                var image = full.image;

                if (image != null && post != null && userRepository.IsAdmin(id))
                {
                    var up = new Uploading();

                    var imageName = await up.UploadImageForPost(image, webHostEnvironment);

                    if (imageName != null)
                    {
                        post.User = userRepository.GetUserByIdentity(post.Identity);
                        post.ImageName = imageName;
                        post.CreateDate = DateTime.Now;
                        _postRepository.InsertPost(post);
                        await _postRepository.SaveAsync();
                        var fullPost = _postRepository.GetFullPost(post);
                        fullPost.User.Posts = null;
                        return CreatedAtAction("GetPost", new { id = fullPost.PostID }, fullPost);
                    }
                    else
                    {
                        return BadRequest();
                    }
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        // DELETE: api/Posts/5
        [HttpDelete("{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public ActionResult<Post> DeletePost(int id)
        {
            var identity = User.Claims.Where(c => c.Type == "Identity").First().Value;
            if (!userRepository.IsAdmin(identity))
            {
                return BadRequest();
            }
            var post = _postRepository.GetPostById(id);
            if (post == null)
            {
                return NotFound();
            }

            _postRepository.DeletePost(post);
            _postRepository.Save();

            return post;
        }

        private bool PostExists(int id)
        {
            if (_postRepository.GetPostById(id) != null)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        [HttpPut("Visit")]
        public async Task<ActionResult> UpdateForVist(int PostIDVisit)
        {
            var res = await _postRepository.UpdateForVisit(PostIDVisit);

            if (res)
            {
                return Ok(true);
            }
            else
            {
                return BadRequest(false);
            }
        }

        [HttpPut("Like")]
        public async Task<ActionResult> UpdateForLike(int PostIDLike)
        {
            var res = await _postRepository.UpdateForLike(PostIDLike);

            if (res)
            {
                return Ok(true);
            }
            else
            {
                return BadRequest(false);
            }
        }
    }
}