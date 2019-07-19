using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using CitiesApp.Data;
using CitiesApp.Models;
using CitiesApp.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;

namespace CitiesApp.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class AdminOperationsController : Controller
    {
        ApplicationDbContext db;
        CoreApiService coreApiService;
        GeoService geoSrv;
        AuthHelperService authSrv;
        public AdminOperationsController(ApplicationDbContext _db, CoreApiService _coreApiService, GeoService _geoSrv, AuthHelperService _authSrv)
        {
            db = _db;
            coreApiService = _coreApiService;
            geoSrv = _geoSrv;
            authSrv = _authSrv;

        }
      
    
        [HttpPost("[action]")]
        public async Task<bool> AddCityAsync(string city, int price)
        {
            bool adminCheck = await authSrv.AdminCheck(Request);
            if (!adminCheck)
            {
                return false;
            }

            Tuple<float, float> coords = await geoSrv.GetCoordsAsync(city);
            float longitude = coords.Item1;
            float latitude = coords.Item2;

            if(!geoSrv.EuropeCheck(longitude, latitude) || price <= 0)
            {
                return false;
            }
            

            City c = new City();
            c.Latitude = latitude;
            c.Longitude = longitude;
            c.Name = city;
            c.Price = price;
            await db.AddAsync(c);
            await db.SaveChangesAsync();
            return true;

        }

        [HttpPost("[action]")]
        public async Task<bool> RemoveCityAsync(int cityid)
        {
            bool adminCheck = await authSrv.AdminCheck(Request);
            if (!adminCheck)
            {
                return false;
            }
            City c = await db.Cities.Where(x => x.Id == cityid).FirstOrDefaultAsync();
            if(c != null)
            {
                db.Entry(c).State = EntityState.Deleted;
                db.SaveChanges();
                return true;
            }
            else
            {
                return false;
            }

            
        }


    }
}