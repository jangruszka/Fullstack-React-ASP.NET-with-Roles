using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CitiesApp.Data;
using CitiesApp.Models;
using CitiesApp.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace CitiesApp.Controllers
{
    [Route("api/[controller]")]
    public class UserManagementController : Controller
    {


        ApplicationDbContext db;
        AuthHelperService authSrv;

        public UserManagementController(ApplicationDbContext _db, AuthHelperService _authSrv)
        {
            db = _db;
            authSrv = _authSrv;
        }

        
     
        [HttpGet("[action]")]
        public async Task<bool> CheckAdminAsync()
        {
                IdentityUser u = await authSrv.GetUser(Request);            
                bool check = await authSrv.RoleCheck(u.Id, "Admin");
                return check;
            
        }

    }
}