using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API.APIDataLayer;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostGroupsController : ControllerBase
    {
        
        IPostGroupRepository postGroupRepository;

        public PostGroupsController(EinsteinContext db)
        {
            postGroupRepository = new PostGroupRepository(db);
        }

        // GET: api/PostGroups
        [HttpGet]
        public ActionResult<IEnumerable<PostGroup>> GetPostGroups()
        {
            return postGroupRepository.GetAllGroups().ToList();
        }

        // GET: api/PostGroups/5
        [HttpGet("{id}")]
        public ActionResult<PostGroup> GetPostGroup(int id)
        {
            var postGroup = postGroupRepository.GetGroupById(id);

            if (postGroup == null)
            {
                return NotFound();
            }

            return postGroup;
        }

        // PUT: api/PostGroups/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public IActionResult PutPostGroup(int id, PostGroup postGroup)
        {
            if (id != postGroup.GroupID)
            {
                return BadRequest();
            }

            postGroupRepository.UpdateGroup(postGroup);

            try
            {
                postGroupRepository.Save();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PostGroupExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/PostGroups
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public ActionResult<PostGroup> PostPostGroup(PostGroup postGroup)
        {
            postGroupRepository.InsertGroup(postGroup);
            postGroupRepository.Save();

            return CreatedAtAction("GetPostGroup", new { id = postGroup.GroupID }, postGroup);
        }

        // DELETE: api/PostGroups/5
        [HttpDelete("{id}")]
        public ActionResult<PostGroup> DeletePostGroup(int id)
        {
            var postGroup = postGroupRepository.GetGroupById(id);
            if (postGroup == null)
            {
                return NotFound();
            }

            postGroupRepository.DeleteGroup(postGroup);
            postGroupRepository.Save();

            return postGroup;
        }

        private bool PostGroupExists(int id)
        {
            if (postGroupRepository.GetGroupById(id) != null)
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
