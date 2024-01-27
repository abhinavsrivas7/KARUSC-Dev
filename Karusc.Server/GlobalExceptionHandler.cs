using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;

namespace Karusc.Server
{
    public class GlobalExceptionHandler : IExceptionHandler
    {
        private readonly IWebHostEnvironment _environment;
        public GlobalExceptionHandler(IWebHostEnvironment env) => _environment = env;

        public async ValueTask<bool> TryHandleAsync(
            HttpContext httpContext, 
            Exception exception, 
            CancellationToken cancellationToken)
        {
            httpContext.Response.StatusCode = StatusCodes.Status500InternalServerError;

            var responseExtensions = _environment.IsProduction()
                ? new Dictionary<string, object?>()
                : new Dictionary<string, object?>
                {
                    { "Message", new[] { exception.Message } },
                    { "Stack Trace", new[] { exception.StackTrace } }
                };
            
            await httpContext.Response.WriteAsJsonAsync<ProblemDetails>(new()
            {
                Status = StatusCodes.Status500InternalServerError,
                Title = "Server Error",
                Extensions = responseExtensions
            }, cancellationToken);
            
            return true;
        }
    }
}
