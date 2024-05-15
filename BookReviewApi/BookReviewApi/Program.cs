using BookReviewApi.Configurations;
using BookReviewApi.Data;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Configure MongoDB settings to be read from appsettings.json.
builder.Services.Configure<MongoDBSettings>(
    builder.Configuration.GetSection("MongoDB"));

// Register BookContext as a singleton service.
builder.Services.AddSingleton<BookContext>();

// Add controllers to the services collection.
builder.Services.AddControllers();

// Add services to support API documentation with Swagger.
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configure CORS to allow any origin, method, and header.
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder =>
    {
        builder.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    // Use Swagger and Swagger UI for API documentation in development.
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Redirect HTTP requests to HTTPS.
app.UseHttpsRedirection();

// Use CORS with the default policy defined above.
app.UseCors();

// Enable authorization middleware.
app.UseAuthorization();

// Map controller routes.
app.MapControllers();

// Run the application.
await app.RunAsync();
