using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CitiesApp.Data;
using CitiesApp.Models;
using CitiesApp.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;

namespace CitiesApp.Controllers
{
    [Route("api/[controller]")]
    public class ClientOperationsController : Controller
    {
        ApplicationDbContext db;
        AuthHelperService authSrv;
        OrdersService oSrv;

        public ClientOperationsController(ApplicationDbContext _db, AuthHelperService _authSrv, OrdersService _oSrv)
        {
            db = _db;
            authSrv = _authSrv;
            oSrv = _oSrv;
        }

        [HttpGet("[action]")]
        public async Task<List<City>> GetAllCitiesAsync()
        {

            List<City>cities = await db.Cities.ToListAsync();
            return cities;

        }

        [Authorize]
        [HttpPost("[action]")]
        public async Task<bool> SendOrderAsync(int cityId, string startDate, string endDate)
        {
          
            DateTime start = DateTime.Parse(startDate);
            DateTime end = DateTime.Parse(endDate);
            
            City c = await db.Cities.Where(x => x.Id == cityId).FirstOrDefaultAsync();
            ApplicationUser u = await authSrv.GetUser(Request);


            if (c != null && u != null)
            {
                Order o = new Order();
                o.CityId = c.Id;
                o.UserId = u.Id;
                o.Start = start;
                o.End = end;
                o.TotalDays = (end - start).Days;
                o.TotalPrice = ((end - start).Days) * c.Price;

                bool dateValidity = oSrv.IsDateValid(o);
                if (!dateValidity) { return false; }
                await db.AddAsync(o);
                await db.SaveChangesAsync();
                return true;

            }
            else
            {
                return false;
            }
        }

        [Authorize]
        [HttpGet("[action]")]
        public async Task<List<Order>> GetMyOrdersAsync()
        {
            ApplicationUser u = await authSrv.GetUser(Request);
            List<Order> os = await db.Orders.Where(x => x.UserId == u.Id).Include(x=>x.City).ToListAsync();
            List<Order> osValidated = oSrv.RemoveOutdatedOrInvalid(new List<Order>(os));

            return osValidated;

        }
    }
}