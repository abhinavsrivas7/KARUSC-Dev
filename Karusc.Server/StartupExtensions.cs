using Karusc.Server.Infrastructure;
using Karusc.Server.Application;
using Karusc.Server.Infrastructure.Persistence;
using Karusc.Server.Infrastructure.FileStorage;

namespace Karusc.Server
{
    internal static class StartupExtensions
    {
        private const string CorsPolicy = "karusc-cors-policy";
        private const string _corsConfigSection = "CLIENT-CORS-ORIGIN";

        internal static void AddCorsFromConfig(this IServiceCollection services, IConfiguration configuration) => 
            services.AddCors(options => options
                .AddPolicy(CorsPolicy, policy => policy
                    .WithOrigins(configuration.GetSection(_corsConfigSection).Value!)
                    .AllowAnyHeader()
                    .AllowAnyMethod()));

        internal static WebApplication InstallKarusc(this WebApplication app)
        {
            app.ApplyMigrations();
            app.UseDefaultFiles();
            app.UseKaruscStaticFiles();
            app.UseSwagger(); // Comment these 2 lines
            app.UseSwaggerUI(); // to turn of swagger
            app.UseHttpsRedirection();
            app.UseExceptionHandler();
            app.UseAuthentication();
            app.UseAuthorization();
            app.MapControllers();
            app.UseCors(CorsPolicy);

            return app;
        }

        internal static WebApplicationBuilder SetupKarusc(this WebApplicationBuilder builder)
        {
            builder.Services.AddCorsFromConfig(builder.Configuration);
            builder.Services.AddControllers();
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            builder.Services.AddApplication();
            builder.Services.AddInfrastructure(builder.Configuration, builder.Environment);
            builder.Services.AddExceptionHandler<GlobalExceptionHandler>();
            builder.Services.AddProblemDetails();
            builder.Services.AddHttpContextAccessor();

            return builder;
        }
    }
}
