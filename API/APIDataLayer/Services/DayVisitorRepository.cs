using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.APIDataLayer
{
    public class DayVisitorRepository : IDayVisitorRepository
    {
        private EinsteinContext db;
        public DayVisitorRepository(EinsteinContext context)
        {
            db = context;
        }

        public StatisticData GetFullStatisticData()
        {
            StatisticData data = new StatisticData();
            var order = db.DaysVisitors.OrderByDescending(d => d.Time);
            data.DayVisits = order.First().Visits;
            data.WeekVisits = order.Take(7).Sum(d => d.Visits);
            data.MonthVisits = order.Take(30).Sum(d => d.Visits);
            data.YearVisits = order.Take(365).Sum(d => d.Visits);
            data.FBVisits = db.DaysVisitors.Sum(d => d.Visits);
            
            // ----------------------------------------------------------------------------------

            var lastWeek = order.Take(7).ToList();
            Dictionary<string, long> weekDay = new Dictionary<string, long>();
            foreach (var day in lastWeek)
            {
                if (!weekDay.ContainsKey(day.Time.DayOfWeek.ToString()))
                {
                    weekDay.Add(day.Time.DayOfWeek.ToString(), day.Visits);
                }
            }

            data.WeekDetail = new Dictionary<string, long>(weekDay.OrderByDescending(k => k.Key));

            var lastMonth = order.Take(28).ToList();
            List<Dictionary<string, long>> lastMonthWeeks = new List<Dictionary<string, long>>();
            int i = 0;
            var weeky = new Dictionary<string, long>();
            foreach (var day in lastMonth)
            {
                ++i;
                if (!weeky.ContainsKey(day.Time.DayOfWeek.ToString()))
                {
                    weeky.Add(day.Time.DayOfWeek.ToString(), day.Visits);
                }
                if (i % 7 == 0)
                {
                    lastMonthWeeks.Add(new Dictionary<string, long>(weeky.OrderByDescending(k => k.Key)));
                    weeky.Clear();
                }
            }
            data.LastMonthWeeks = lastMonthWeeks;

            return data;
        }

        public bool AddToVisitors()
        {
            try
            {
                if (db.DaysVisitors.Count()==0)
                {
                    var today = new DayVisitors()
                    {
                        Time = DateTime.Now,
                        Visits = 1
                    };
                    db.DaysVisitors.Add(today);
                    db.SaveChanges();
                    return true;
                }
                
                bool isToday = db.DaysVisitors.OrderByDescending(d => d.Time).First().Time.DayOfYear == DateTime.Now.DayOfYear;

                if (isToday)
                {
                    db.DaysVisitors.OrderByDescending(d => d.Time).First().Visits += 1;
                }
                else
                {
                    var today = new DayVisitors(){
                        Time = DateTime.Now,
                        Visits = 1
                    };
                    db.DaysVisitors.Add(today);
                }
                db.SaveChanges();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
    }
}