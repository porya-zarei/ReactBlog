
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace API.APIDataLayer
{
    public class PostGroupRepository:IPostGroupRepository
    {

        private EinsteinContext db;

        public PostGroupRepository(EinsteinContext context)
        {
            db = context;
        }

        public IEnumerable<PostGroup> GetAllGroups()
        {
            return db.PostGroups;
        }

        public PostGroup GetGroupById(int groupId)
        {
            return db.PostGroups.Find(groupId);
        }

        public bool InsertGroup(PostGroup postGroup)
        {
            try
            {
                db.PostGroups.Add(postGroup);
                return true;
            }
            catch (Exception)
            {

                return false;
            }
        }

        public bool UpdateGroup(PostGroup postGroup)
        {
            try
            {
                db.Entry(postGroup).State = EntityState.Modified;
                return true;
            }
            catch (Exception)
            {

                return false;
            }
        }

        public bool DeleteGroup(PostGroup postGroup)
        {
            try
            {
                db.Entry(postGroup).State = EntityState.Deleted;
                return true;
            }
            catch (Exception)
            {

                return false;
            }
        }

        public bool DeleteGroup(int groupId)
        {
            try
            {
                var group = GetGroupById(groupId);
                DeleteGroup(group);
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

        public void Dispose()
        {
            db.Dispose();
        }

        public IEnumerable<ShowGroupViewModel> GetGroupsForView()
        {
            return (db.PostGroups.Select(g => new ShowGroupViewModel()
            {

                GroupID = g.GroupID,
                GroupTitle = g.GroupTitle,
                PostCount = g.Posts.Count


            }));
        }

    }
}
