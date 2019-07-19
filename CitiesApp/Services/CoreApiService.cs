using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace CitiesApp.Services
{
    public class CoreApiService
    {
        private readonly HttpClient _httpClient;
        public CoreApiService()
        {
            _httpClient = new HttpClient();
        }

        public async Task<T> GetAsync<T>(Uri requestUrl)
        {           
            var response =
                await _httpClient.GetAsync(requestUrl, HttpCompletionOption.ResponseHeadersRead);
            var data = await response.Content.ReadAsStringAsync();
         
            return JsonConvert.DeserializeObject<T>(data);
        }
        public async Task<string> GetAsStringAsync(Uri requestUrl)
        {
            var response =
                await _httpClient.GetAsync(requestUrl, HttpCompletionOption.ResponseHeadersRead);
            var data = await response.Content.ReadAsStringAsync();

            return data;
        }

    }
}
