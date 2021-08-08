using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.APIDataLayer
{
    public class FullPost
    {
        //public Post post { get; set; }

        [Display(Name = "گروه پست")]
        [Required(ErrorMessage = "لطفا {0} را وارد کنید")]
        public int GroupID { get; set; }

        [Required]
        public string Identity { get; set; }

        [Display(Name = "عنوان")]
        [Required(ErrorMessage = "لطفا {0} را وارد کنید")]
        [MaxLength(250)]
        public string Title { get; set; }

        [Display(Name = "توضیح مختصر")]
        [Required(ErrorMessage = "لطفا {0} را وارد کنید")]
        [MaxLength(350)]
        [DataType(DataType.MultilineText)]
        public string ShortDescription { get; set; }

        [Display(Name = "متن")]
        [Required(ErrorMessage = "لطفا {0} را وارد کنید")]
        [DataType(DataType.MultilineText)]
        public string Text { get; set; }

        [Display(Name = "بازدید")]
        public int Visit { get; set; }

        [Display(Name = "تصویر")]
        [DataType(DataType.MultilineText)]
        public string ImageName { get; set; }

        [Display(Name = "اسلایدر")]
        public bool ShowInSlider { get; set; }

        [Display(Name = "کلمات کلیدی")]
        public string Tags { get; set; }

        [Display(Name = "لایک")]
        public int Like { get; set; }

        [Display(Name = "تاریخ ساخت")]
        public DateTime CreateDate { get; set; }

        public IFormFile image { get; set; }

        public Post MapToPost()
        {
            return new Post
            {
                GroupID = GroupID,
                Identity=Identity,
                Title=Title,
                ShortDescription=ShortDescription,
                Text=Text,
                Visit=Visit,
                ImageName=ImageName,
                Tags=Tags,
                Like=Like,
                ShowInSlider=ShowInSlider,
                CreateDate = CreateDate

            };
        }
    }
    
}
