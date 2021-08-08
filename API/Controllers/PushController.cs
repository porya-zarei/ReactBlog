using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API.APIDataLayer;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PushController : ControllerBase
    {
        private readonly EinsteinContext _context;

        public PushController(EinsteinContext context)
        {
            _context = context;
        }

        // GET: api/Push
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PushSubscription>>> GetPushSubscription()
        {
            return await _context.PushSubscription.ToListAsync();
        }

        // GET: api/Push/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PushSubscription>> GetPushSubscription(int id)
        {
            var pushSubscription = await _context.PushSubscription.FindAsync(id);

            if (pushSubscription == null)
            {
                return NotFound();
            }

            return pushSubscription;
        }

        // PUT: api/Push/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPushSubscription(int id, PushSubscription pushSubscription)
        {
            if (id != pushSubscription.pushID)
            {
                return BadRequest();
            }

            _context.Entry(pushSubscription).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PushSubscriptionExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Push
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<PushSubscription>> PostPushSubscription(PushSubscription pushSubscription)
        {
            _context.PushSubscription.Add(pushSubscription);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPushSubscription", new { id = pushSubscription.pushID }, pushSubscription);
        }

        // DELETE: api/Push/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<PushSubscription>> DeletePushSubscription(int id)
        {
            var pushSubscription = await _context.PushSubscription.FindAsync(id);
            if (pushSubscription == null)
            {
                return NotFound();
            }

            _context.PushSubscription.Remove(pushSubscription);
            await _context.SaveChangesAsync();

            return pushSubscription;
        }

        private bool PushSubscriptionExists(int id)
        {
            return _context.PushSubscription.Any(e => e.pushID == id);
        }

        //[HttpGet]
        //public async Task<ActionResult> SendNotificationToAllMembers(string text)
        //{

        //}

    }
}
