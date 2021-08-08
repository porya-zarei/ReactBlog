using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.APIDataLayer;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContaactMeController : ControllerBase
    {
        [HttpPost]
        public ActionResult Contact(ContactMe contact)
        {
            EmailSender emailSender = new EmailSender();
            try
            {
                emailSender.Send("p.z.e201616@gmail.com",contact.FullName.ToString()+" | "+contact.ClientEmail.ToString(),contact.Text);
                return Ok();
            }
            catch (Exception)
            {

                return (NotFound());
            }

        }
    }
}
