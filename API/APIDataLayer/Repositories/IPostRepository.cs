using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace API.APIDataLayer
{
    public interface IPostRepository : IDisposable
    {
        IEnumerable<Post> GetAllPosts();

        Post GetPostById(int postId);

        bool InsertPost(Post post);

        Task<Post> UpdatePost(Post post);

        Task<bool> UpdateForVisit(int id);

        Task<bool> UpdateForLike(int id);

        bool DeletePost(Post post);

        bool DeletePost(int postId);

        void Save();

        IEnumerable<Post> TopPosts(int take = 4);
        IEnumerable<Post> PostInSlider();
        IEnumerable<Post> LastPosts(int take = 4);
        IEnumerable<Post> ShowPostByGroupId(int groupId);
        IEnumerable<Post> SearchPost(string search);
        Post GetFullPost(Post post);
        Task SaveAsync();
    }
}
