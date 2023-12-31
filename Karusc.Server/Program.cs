var builder = WebApplication.CreateBuilder(args);

var corsPolicy = "dev-cors";
builder.Services.AddCors(options => 
    options.AddPolicy(corsPolicy, policy => policy
        .WithOrigins("https://localhost:5173")
        .AllowAnyHeader()
        .AllowAnyMethod()));

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();
app.UseSwagger();
app.UseSwaggerUI();
app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.UseCors(corsPolicy);
app.MapFallbackToFile("/index.html");

app.Run();
