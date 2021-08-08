using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace API.APIDataLayer
{
    public class PostCommentRepository:IPostCommentRepository
    {

        private EinsteinContext db;

        public PostCommentRepository(EinsteinContext context)
        {
            db = context;
        }

        public bool AddComment(PostComment postComment)
        {
            try
            {
                db.PostComments.Add(postComment);
                db.SaveChanges();
                return true;
            }
            catch (Exception)
            {

                return false;
            }
        }

        public IEnumerable<PostComment> GetPostComments(int PostId)
        {
            return (db.PostComments.Where(c => c.PostID == PostId));
        }

        public bool DeleteComment(int commentId)
        {
            try
            {
                var comment = db.PostComments.Find(commentId);
                db.PostComments.Remove(comment);
                db.SaveChanges();
                return true;
            }
            catch (Exception)
            {

                return false;
            }
        }

        public void Dispose()
        {
            db.Dispose();
        }


    }
}
