using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace API.APIDataLayer
{
    public class EinsteinContext : DbContext
    {
        public EinsteinContext(DbContextOptions<EinsteinContext> options) : base(options)
        {
        }

        public DbSet<PostGroup> PostGroups { get; set; }

        public DbSet<Post> Posts { get; set; }

        public DbSet<PostComment> PostComments { get; set; }

        public DbSet<User> Users { get; set; }

        public DbSet<PushSubscription> PushSubscription { get; set; }

        public DbSet<DayVisitors> DaysVisitors { get; set; }
    }
}