using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CitiesApp.Data;
using CitiesApp.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;

namespace CitiesApp.Services
{
    public class AuthHelperService
    {
        ApplicationDbContext db;
        UserManager<ApplicationUser>um;
        public AuthHelperService(ApplicationDbContext _db, UserManager<ApplicationUser> _um)
        {
            db = _db;
            um = _um;
        }

        public async Task<bool> RoleCheck(string id, string role)
        {
            string roleId = await db.Roles.Where(x => x.Name == role).Select(x => x.Id).FirstOrDefaultAsync();
            IdentityUserRole<string> ur = await db.UserRoles.Where(x => x.RoleId == roleId && x.UserId == id).FirstOrDefaultAsync();

            if(ur != null)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        public async Task<ApplicationUser> GetUser(Microsoft.AspNetCore.Http.HttpRequest req)
        {
            Microsoft.Extensions.Primitives.StringValues authUser = req.Headers["User"];
            dynamic json = JValue.Parse(authUser);
            string userid = json.sub;

            ApplicationUser u = await db.Users.Where(x => x.Id == userid).FirstOrDefaultAsync();
            return u;

        }

        public async Task<bool> AdminCheck(Microsoft.AspNetCore.Http.HttpRequest req)
        {
            ApplicationUser u = await GetUser(req);
            bool isAdmin = await RoleCheck(u.Id, "Admin");
            return isAdmin;
        }


    }
}
