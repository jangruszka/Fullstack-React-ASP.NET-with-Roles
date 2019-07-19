using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;

namespace CitiesApp.Services
{
    public class GeoService
    {
        CoreApiService coreApiSrv;
        public GeoService(CoreApiService _coreApiSrv)
        {
            coreApiSrv = _coreApiSrv;
        }

        public bool EuropeCheck(float longitude, float latitude)
        {
            if (longitude < -10 || longitude > 40)
            {
                return false;
            }
            if (latitude < 30 || latitude > 60)
            {
                return false;
            }
            return true;
        }

        public Uri GeoUriBuilder(string city)
        {
            UriBuilder b = new UriBuilder();
            b.Scheme = "https";
            b.Host = "api.openweathermap.org";
            b.Path = "data/2.5/weather";
            StringBuilder sb = new StringBuilder();
            sb.Append("q=").Append(city).Append("&appid=8b73082f7b6509b01f99db4dbfae848a");
            b.Query = sb.ToString();
            Uri u = b.Uri;
            return u;
        }



        public async Task<Tuple<float, float>> GetCoordsAsync(string city)
        {
            Uri u = GeoUriBuilder(city);
            string geoString = await coreApiSrv.GetAsStringAsync(u);

            dynamic json = JValue.Parse(geoString);
            float longitude = json.coord.lon;
            float latitude = json.coord.lat;

            return Tuple.Create(longitude, latitude);
        }

    }
}
