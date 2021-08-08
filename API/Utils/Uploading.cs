using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace API
{
    public class Uploading
    {

        public async Task<bool> UploadImage(IFormFile image, IWebHostEnvironment webHostEnvironment)
        {
            try
            {
                string uniquefilename = string.Empty;

                if (image != null)
                {
                    //string mainDir = webHostEnvironment.ContentRootPath.Substring(0, webHostEnvironment.ContentRootPath.Length - 4);
                    //string uploadFolder = Path.Combine(mainDir,"einstein","public","images","postsimages");
                    //    //@"G:\Project\IMPORTANT-SAMPLE\Blog\Asp-Core\einstein\public\images\postsimages";

                    string uploadFolder = Path.Combine(webHostEnvironment.WebRootPath, "images", "posts_image");
                    uniquefilename = image.FileName;
                    string filepath = Path.Combine(uploadFolder, uniquefilename);
                    await using (var fileStream = new FileStream(filepath, FileMode.Create))
                    {
                        image.CopyTo(fileStream);
                    }
                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch (Exception)
            {
                return false;
            }
        }

        public async Task<string> UploadImageForPost(IFormFile image, IWebHostEnvironment webHostEnvironment)
        {
            try
            {
                

                if (image != null)
                {
                    string uniquefilename = string.Empty;
                    //string mainDir = webHostEnvironment.ContentRootPath.Substring(0, webHostEnvironment.ContentRootPath.Length - 4);
                    //string uploadFolder = Path.Combine(mainDir,"einstein","public","images","postsimages");
                    //    //@"G:\Project\IMPORTANT-SAMPLE\Blog\Asp-Core\einstein\public\images\postsimages";

                    string uploadFolder = Path.Combine(webHostEnvironment.WebRootPath, "images", "posts_image");
                    uniquefilename = Guid.NewGuid().ToString()+image.FileName;
                    string filepath = Path.Combine(uploadFolder, uniquefilename);
                    await using (var fileStream = new FileStream(filepath, FileMode.Create))
                    {
                        image.CopyTo(fileStream);
                    }
                    return uniquefilename;
                }
                else
                {
                    return null;
                }
            }
            catch (Exception)
            {
                return null;
            }
        }

        public async Task<bool> UploadFiles(List<IFormFile> files, IWebHostEnvironment webHostEnvironment)
        {

            try
            {
                foreach (var file in files)
                {
                    string uniquefilename = string.Empty;

                    if (file != null)
                    {
                        string uploadFolder = Path.Combine(webHostEnvironment.WebRootPath, "files", "public");
                        uniquefilename = file.FileName;
                        string filepath = Path.Combine(uploadFolder, uniquefilename);
                        await using (var fileStream = new FileStream(filepath, FileMode.Create))
                        {
                            file.CopyTo(fileStream);
                        }
                    }

                }

                return true;
            }
            catch (Exception)
            {

                return false;
            }

        }

        public async Task<bool> UploadFile(IFormFile file, IWebHostEnvironment webHostEnvironment)
        {

            try
            {
                string uniquefilename = string.Empty;

                if (file != null)
                {
                    string uploadFolder = Path.Combine(webHostEnvironment.WebRootPath, "files", "public");
                    uniquefilename = file.FileName;
                    string filepath = Path.Combine(uploadFolder, uniquefilename);
                    await using (var fileStream = new FileStream(filepath, FileMode.Create))
                    {
                        file.CopyTo(fileStream);
                    }
                }

                return true;
            }
            catch (Exception)
            {

                return false;
            }

        }

    }
}
