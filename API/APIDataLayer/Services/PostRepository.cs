using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace API.APIDataLayer
{
    public class PostRepository : IPostRepository
    {
        private EinsteinContext db;

        public PostRepository(EinsteinContext context)
        {
            db = context;
        }

        public IEnumerable<Post> GetAllPosts()
        {
            return db.Posts;
        }

        public Post GetPostById(int postId)
        {
            return db.Posts.Find(postId);
        }

        public bool InsertPost(Post post)
        {
            try
            {
                post.CreateDate = DateTime.UtcNow;
                db.Posts.Add(post);
                return true;
            }
            catch (Exception)
            {

                return false;
            }
        }

        public async Task<Post> UpdatePost(Post post)
        {
            try
            {
                var old = db.Posts.Find(post.PostID);
                db.Posts.Update(old).CurrentValues.SetValues(post);
                await db.SaveChangesAsync();
                var newPost = await db.Posts.FindAsync(post.PostID);
                return newPost;
            }
            catch (Exception)
            {

                return null;
            }
        }

        public bool DeletePost(Post post)
        {
            try
            {
                db.Entry(post).State = EntityState.Deleted;
                return true;
            }
            catch (Exception)
            {

                return false;

            }
        }

        public bool DeletePost(int postId)
        {
            try
            {
                var post = GetPostById(postId);
                DeletePost(post);
                return true;
            }
            catch (Exception)
            {

                return false;
            }
        }

        public void Save()
        {
           db.SaveChanges();
        }

        public async Task SaveAsync()
        {
            await db.SaveChangesAsync();
        }

        public void Dispose()
        {
            db.Dispose();
        }

        public IEnumerable<Post> TopPosts(int take = 4)
        {
            return (db.Posts.OrderByDescending(p => p.Visit).Take(take));
        }

        public IEnumerable<Post> PostInSlider()
        {
            return (db.Posts.Where(p => p.ShowInSlider == true));
        }

        public IEnumerable<Post> LastPosts(int take = 4)
        {
            return (db.Posts.OrderByDescending(p => p.CreateDate).Take(take));
        }

        public IEnumerable<Post> ShowPostByGroupId(int groupId)
        {
            return (db.Posts.Where(p => p.GroupID == groupId));
        }

        public IEnumerable<Post> SearchPost(string search)
        {
            return (db.Posts.Where(p => p.Title.Contains(search) || p.ShortDescription.Contains(search) || p.Tags.Contains(search) || p.Text.Contains(search)).Distinct());
        }

        public Post GetFullPost(Post post)
        {
            var fullPost = db.Posts.Where(p => p.Title == post.Title && p.ShortDescription == post.ShortDescription && p.Text == post.Text).First();
            return fullPost;
        }

        public async Task<bool> UpdateForVisit(int id)
        {
            try
            {
                var old = await db.Posts.FindAsync(id);
                old.Visit += 1;
                db.Entry(old).State = EntityState.Modified;
                await db.SaveChangesAsync();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public async Task<bool> UpdateForLike(int id)
        {
            try
            {
                var old = await db.Posts.FindAsync(id);
                old.Like += 1;
                db.Entry(old).State = EntityState.Modified;
                await db.SaveChangesAsync();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

    }
}
