using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace API.APIDataLayer
{
    public class PostComment
    {
        [Key]
        public int CommentID { get; set; }

        [Display(Name = "پست")]
        [Required(ErrorMessage = "لطفا {0} را وارد کنید")]
        public int PostID { get; set; }

        [Display(Name = "نام")]
        [Required(ErrorMessage = "لطفا {0} را وارد کنید")]
        [MaxLength(150)]
        public string Name { get; set; }

        [Display(Name = "ایمیل")]
        [MaxLength(250)]
        public string Email { get; set; }
       
        [Display(Name = "کامنت")]
        [Required(ErrorMessage = "لطفا {0} را وارد کنید")]
        [MaxLength(500)]
        public string Comment { get; set; }

        [Display(Name = "تاریخ ایجاد")]
        public DateTime CreateDate { get; set; }

        public virtual Post Post { get; set; }

        public PostComment()
        {

        }
    }
}
