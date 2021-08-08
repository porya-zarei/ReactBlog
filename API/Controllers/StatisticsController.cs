using API.APIDataLayer;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StatisticsController : ControllerBase
    {
        private IDayVisitorRepository visitorRepository;
        public StatisticsController(EinsteinContext context)
        {
            visitorRepository = new DayVisitorRepository(context);
        }
        // GET: api/<StatisticsController>
        [HttpGet("Full")]
        public ActionResult<StatisticData> GetFullStatistics()
        {
            return visitorRepository.GetFullStatisticData();
        }

        [HttpGet("visit")]
        public ActionResult AddToVisitorsOnDay()
        {
            visitorRepository.AddToVisitors();
            return Ok();
        }
    }
}
