using Microsoft.AspNetCore.Authentication.JwtBearer;
using Newtonsoft.Json;
using System.Net.Http.Json;
using System.Text.Json;

namespace Karusc.Server.Infrastructure.Delivery
{
    internal static class HttpClientExtensions
    {
        internal static async Task<TResponse?> SendAuthenticatedAsync<TRequest, TResponse>(
            this HttpClient client,
            string uri,
            HttpMethod method,
            Func<Task<string>> tokenGenerator,
            CancellationToken cancellationToken,
            TRequest? body = null) 
            where TRequest : class 
            where TResponse : class
        {
            string token = await tokenGenerator();
            client.DefaultRequestHeaders.Authorization = new(JwtBearerDefaults.AuthenticationScheme, token);  
            HttpRequestMessage request = new(method, uri);

            if(body is not null)
            {
                request.Content = JsonContent.Create(body);
            }

            var response = await client.SendAsync(request, cancellationToken);
            var responseAsString = await response.Content.ReadAsStringAsync(cancellationToken);
            return JsonConvert.DeserializeObject<TResponse>(responseAsString);
        }
    }
}
