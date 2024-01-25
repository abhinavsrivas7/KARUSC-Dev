using Karusc.Server;
using Karusc.Server.Application;
using Karusc.Server.Infrastructure;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCorsFromConfig(builder.Configuration);
builder.Services.AddConfigurationOptions(builder.Environment, builder.Configuration);
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddApplication();
builder.Services.AddInfrastructure(builder.Configuration, builder.Environment.EnvironmentName);

var app = builder.Build();

app.UseDefaultFiles();
app.UseKaruscStaticFiles(builder.Environment, builder.Configuration);
app.UseSwagger(); // Comment these 2 lines
app.UseSwaggerUI(); // to turn of swagger
app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.UseCors(StartupExtensions.CorsPolicy);
app.MapFallbackToFile("/index.html");

app.Run();