using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.APIDataLayer
{
    public class PushSubscription
    {

            [Key]
            public int pushID { get; set; }
            [Required]
            public string endpoint { get; set; }

            public DateTime expirationTime { get; set; }
            
            public Keys keys { get; set; }

    }
        [Owned]
        public class Keys
        {
            
            public string auth { get; set; }
            public string p256dh { get; set; }
        }
}
