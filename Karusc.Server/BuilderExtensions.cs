namespace Karusc.Server
{
    public static class BuilderExtensions
    {
        public const string CorsPolicy = "karusc-cors-policy";
        private const string _corsConfigSection = "CLIENT-CORS-ORIGIN";

        public static void AddCorsFromConfig(
            this IServiceCollection services,
            IConfiguration configuration) => services
                .AddCors(options => options
                    .AddPolicy(CorsPolicy, policy => policy
                        .WithOrigins(configuration.GetSection(_corsConfigSection).Value!)
                        .AllowAnyHeader()
                        .AllowAnyMethod()));

        public static bool IsDevelopmentOrLocal(this IWebHostEnvironment environment) => 
            environment.IsDevelopment() || environment.EnvironmentName.Equals("Local");
    }
}
