using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UploadFilesController : ControllerBase
    {
        private readonly IWebHostEnvironment webHostEnvironment;

        public UploadFilesController(IWebHostEnvironment _webHostEnvironment)
        {
            webHostEnvironment = _webHostEnvironment;
        }

        [HttpPost("Image")]
        public async Task<ActionResult> UploadImage(IFormFile Image)
        {
            try
            {
                if (Image != null)
                {
                    Uploading up = new Uploading();
                    var res = await up.UploadImage(Image, webHostEnvironment);
                    return Ok();
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpPost("Files")]
        [RequestSizeLimit(long.MaxValue)]
        public async Task<ActionResult> UploadFiles(List<IFormFile> files)
        {
            try
            {
                if (files != null)
                {
                    Uploading up = new Uploading();
                    var res = await up.UploadFiles(files, webHostEnvironment);
                    if (res)
                    {
                        return Ok();
                    }
                    else
                    {
                        return BadRequest();
                    }
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpPost("File")]
        [RequestSizeLimit(long.MaxValue)]
        public async Task<ActionResult> UploadFiles(IFormFile file)
        {
            try
            {
                if (file != null)
                {
                    Uploading up = new Uploading();
                    var res = await up.UploadFile(file, webHostEnvironment);
                    return Ok();
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

    }
}
