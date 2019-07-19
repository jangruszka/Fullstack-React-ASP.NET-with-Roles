using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CitiesApp.Models;

namespace CitiesApp.Services
{
    public class OrdersService
    {
        public bool IsDateValid(Order o)
        {
            DateTime today = DateTime.Now;
            if (o.Start < today)
            {
                return false;
            }
            else if (o.End < o.Start)
            {
                return false;
            }
            else
            {
                return true;
            }

        }

        public List<Order> RemoveOutdatedOrInvalid(List<Order> os)
        {
            List<Order> orders = os;
            List<Order> validated = new List<Order>();

            foreach (Order o in orders)
            {
                bool isValid = IsDateValid(o);
                if (isValid)
                {
                    validated.Add(o);
                }
            }
            return validated;

        }

    }
}
