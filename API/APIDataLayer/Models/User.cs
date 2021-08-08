using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.APIDataLayer
{
    public class User
    {
        [Key]
        public string Identity { get; set; }

        [Required]
        [MaxLength(250)]
        public string FullName { get; set; }

        [Required]
        [MaxLength(250)]
        public string Password { get; set; }

        [Required]
        [MaxLength(600)]
        public string Email { get; set; }

        public Roles Role { get; set; } = Roles.User;

        public virtual List<Post> Posts { get; set; }

        public User()
        {

        }


    }

    public enum Roles
    {
        Creator=5,
        Admin=4,
        Bloger=3,
        SpecialUser=2,
        Topuser=1,
        User=0
    }
}
