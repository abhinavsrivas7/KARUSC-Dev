using Karusc.Server;
using Karusc.Server.Application;
using Karusc.Server.Infrastructure;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCorsFromConfig(builder.Configuration);
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen(options => options.AddSecurityDefinition(
    JwtBearerDefaults.AuthenticationScheme, 
    new() { Scheme = JwtBearerDefaults.AuthenticationScheme }));

builder.Services.AddApplication();
builder.Services.AddInfrastructure(builder.Configuration, builder.Environment);
builder.Services.AddExceptionHandler<GlobalExceptionHandler>();
builder.Services.AddProblemDetails();

var app = builder.Build();

app.UseDefaultFiles();
app.UseKaruscStaticFiles(builder.Environment, builder.Configuration);
app.UseSwagger(); // Comment these 2 lines
app.UseSwaggerUI(); // to turn of swagger
app.UseHttpsRedirection();
app.UseExceptionHandler();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.UseCors(StartupExtensions.CorsPolicy);
app.MapFallbackToFile("/index.html");

app.Run();