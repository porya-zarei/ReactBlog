using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.APIDataLayer
{
    public class DayVisitors
    {
        [Key]
        public DateTime Time { get; set; }
        public long Visits { get; set; }
        public List<string> IPs { get; set; }
    }
}
