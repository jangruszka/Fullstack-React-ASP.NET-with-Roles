using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CitiesApp.Models
{
    public class City
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Price { get; set; }
        public float Longitude { get; set; }
        public float Latitude { get; set; }

    }
}
