using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.APIDataLayer
{
    public class StatisticData
    {
        public long DayVisits { get; set; }
        public long WeekVisits { get; set; }
        public long MonthVisits { get; set; }
        public long YearVisits { get; set; }
        public long FBVisits { get; set; }
        public Dictionary<string,long> WeekDetail { get; set; }
        public List<Dictionary<string, long>> LastMonthWeeks { get; set; }
    }
}
