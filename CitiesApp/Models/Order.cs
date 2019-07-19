using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CitiesApp.Models
{
    public class Order
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public ApplicationUser User { get; set; }

        public int CityId { get; set; }
        public City City { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public int TotalDays { get; set; }
        public int TotalPrice { get; set; }
    }
}
