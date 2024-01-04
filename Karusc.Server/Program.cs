using Karusc.Server;
using Karusc.Server.Application;
using Karusc.Server.Infrastructure;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCorsFromConfig(builder.Configuration);
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddApplication();
builder.Services.AddInfrastructure(builder.Configuration);

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();
app.UseSwagger(); // Comment these 2 lines
app.UseSwaggerUI(); // to turn of swagger
app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.UseCors(BuilderExtensions.CorsPolicy);
app.MapFallbackToFile("/index.html");

app.Run();