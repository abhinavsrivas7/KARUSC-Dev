using Karusc.Server;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCorsFromConfig(builder.Configuration);
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

if (builder.Environment.IsDevelopmentOrLocal())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.UseCors(BuilderExtensions.CorsPolicy);
app.MapFallbackToFile("/index.html");

app.Run();
