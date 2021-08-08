using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace API.APIDataLayer
{
    public interface IPostCommentRepository : IDisposable
    {
        IEnumerable<PostComment> GetPostComments(int postId);

        bool AddComment(PostComment postComment);
        bool DeleteComment(int commentId);

    }
}
