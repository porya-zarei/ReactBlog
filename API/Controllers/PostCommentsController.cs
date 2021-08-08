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
    public class PostCommentsController : ControllerBase
    {
        
        private IPostCommentRepository postCommentRepository;

        public PostCommentsController(EinsteinContext db)
        {
            postCommentRepository = new PostCommentRepository(db);
        }

        // GET: api/PostComments
        //[HttpGet]
        //public ActionResult<IEnumerable<PostComment>> GetPostComments()
        //{
        //    return postCommentRepository.GetPostComments();
        //}

        // GET: api/PostComments/5
        [HttpGet("{id}")]
        public ActionResult<IEnumerable<PostComment>> GetPostComments(int id)
        {
            var postComments = postCommentRepository.GetPostComments(id);

            if (postComments == null)
            {
                return NotFound();
            }

            return postComments.ToList();
        }

        // PUT: api/PostComments/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        //[HttpPut("{id}")]
        //public IActionResult PutPostComment(int id, PostComment postComment)
        //{
        //    if (id != postComment.CommentID)
        //    {
        //        return BadRequest();
        //    }

        //    _context.Entry(postComment).State = EntityState.Modified;

        //    try
        //    {
        //        _context.SaveChangesAsync();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!PostCommentExists(id))
        //        {
        //            return NotFound();
        //        }
        //        else
        //        {
        //            throw;
        //        }
        //    }

        //    return NoContent();
        //}

        // POST: api/PostComments
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public ActionResult<PostComment> PostPostComment(PostComment postComment)
        {
            postComment.CreateDate = DateTime.UtcNow;
            postCommentRepository.AddComment(postComment);
            

            return CreatedAtAction("GetPostComment", new { id = postComment.CommentID }, postComment);
        }

        // DELETE: api/PostComments/5
        [HttpDelete("{id}")]
        public ActionResult<PostComment> DeletePostComment(int id)
        {
            try
            {
                postCommentRepository.DeleteComment(id);
                return Ok();
            }
            catch (Exception)
            {

                return NotFound();
            }
            
            
        }

    }
}
