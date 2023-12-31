var builder = WebApplication.CreateBuilder(args);

var corsPolicy = "dev-cors";
// Add services to the container.
builder.Services.AddCors(options => 
    options.AddPolicy(corsPolicy, policy => policy
        .WithOrigins("https://localhost:5173")
        //.AllowAnyOrigin()
        .AllowAnyHeader()
        .AllowAnyMethod()));

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();
app.UseCors(corsPolicy);

app.MapFallbackToFile("/index.html");

app.Run();
