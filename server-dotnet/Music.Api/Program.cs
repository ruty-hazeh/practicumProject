using Amazon;
using Amazon.Runtime;
using Amazon.S3;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Music.Core.Models;
using Music.Core.Repositories;
using Music.Core.Services;
using Music.Data;
using Music.Data.Repositories;
using Music.Service;
using System.Security.Claims;
using System.Text;
using System.Text.Json.Serialization;


var builder = WebApplication.CreateBuilder(args);

var openAiKey = builder.Configuration["OpenAI:ApiKey"];

//builder.WebHost.ConfigureKestrel(serverOptions =>
//{
//    serverOptions.Limits.MaxRequestBodySize = 52428800; // 50MB
//});

builder.Services.Configure<FormOptions>(options =>
{
    options.MultipartBodyLengthLimit = 20 * 1024 * 1024; // 20MB
});

builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
        options.JsonSerializerOptions.WriteIndented = true;
    });

//builder.Services.AddSingleton<IAmazonS3>(new AmazonS3Client(RegionEndpoint.USEast1));



builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{



    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Scheme = "Bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Name = "Authorization",
        Description = "Enter your Bearer token",
        Type = SecuritySchemeType.Http
    });

    options.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            new string[] {}
        }
    });
});



//builder.Services.AddCors(options =>
//{
//    options.AddPolicy("AllowAll",policy =>
//                  policy.AllowAnyOrigin()
//                        .AllowAnyMethod()
//                        .AllowAnyHeader());
//                        .AllowCredentials()

//});



builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.WithOrigins(
            "https://client-react-gu3s.onrender.com",
            "https://client-angular-1fw9.onrender.com",
            "http://localhost:3000", // React local dev
            "http://localhost:4200"  // Angular local dev
        )
        .AllowCredentials()
        .AllowAnyHeader()
        .AllowAnyMethod();
    });
});

//builder.Services.AddDbContext<DataContext>();

//builder.Services.AddDbContext<DataContext>(options =>
//    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));


builder.Services.AddDbContext<DataContext>(options =>
    options.UseMySql(
        builder.Configuration.GetConnectionString("DefaultConnection"),
        ServerVersion.AutoDetect(builder.Configuration.GetConnectionString("DefaultConnection"))
    ));


builder.Services.AddScoped<ISingerService, SingerService>();
builder.Services.AddScoped<ISingerRepository, SingerRepository>();

builder.Services.AddScoped<ISongService, SongService>();
builder.Services.AddScoped<ISongRepository, SongRepository>();

builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IUserRepository, UserRepository>();

builder.Services.AddScoped<IPlaylistService, PlaylistService>();
builder.Services.AddScoped<IPlaylistRepository, PlaylistRepository>();


builder.Services.Configure<FormOptions>(options =>
{
    options.MultipartBodyLengthLimit = 52428800; // 50MB
});
//builder.Services.AddSingleton<IAmazonS3>(sp =>
//{
//    var config = sp.GetRequiredService<IConfiguration>();
//    var awsAccessKeyId = config["AWS:AccessKeyId"];
//    var awsSecretAccessKey = config["AWS:SecretAccessKey"];
//    var region = RegionEndpoint.USEast1; 

//    var credentials = new BasicAWSCredentials(awsAccessKeyId, awsSecretAccessKey);
//    return new AmazonS3Client(credentials, region);
//});


builder.Services.AddSingleton<IAmazonS3>(sp =>
{
    var config = sp.GetRequiredService<IConfiguration>();
    var awsAccessKeyId = config["AWS:AccessKey"];
    var awsSecretAccessKey = config["AWS:SecretKey"];
    var region = RegionEndpoint.GetBySystemName(config["AWS:Region"]); // קבלת האזור מתוך הקונפיגורציה

    var credentials = new BasicAWSCredentials(awsAccessKeyId, awsSecretAccessKey);
    return new AmazonS3Client(credentials, region);
});

builder.Services.AddHttpClient();
//builder.Services.AddSingleton(new OpenAiImageAnalyzer(builder.Configuration["OpenAI:ApiKey"]));



builder.Services.AddScoped<AuthService>();

builder.Services.AddScoped<IS3Service, S3Service>();


builder.Services.AddAutoMapper(typeof(MappingProfile));

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"])),
        RoleClaimType = ClaimTypes.Role
    };
});


builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("AdminOnly", policy => policy.RequireRole("Admin"));
    options.AddPolicy("EditorOrAdmin", policy => policy.RequireRole("Editor", "Admin"));
    options.AddPolicy("ViewerOnly", policy => policy.RequireRole("Viewer"));
});



var app = builder.Build();

//if (app.Environment.IsDevelopment())
//{
app.UseSwagger();
app.UseSwaggerUI();
//}
app.UseRouting();
app.UseCors("AllowAll");

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.Use(async (context, next) =>
{
    await next();

    if (context.Response.StatusCode == StatusCodes.Status403Forbidden)
    {
        context.Response.ContentType = "application/json";
        await context.Response.WriteAsync("{\"error\": \"You do not have permission to perform this action!\"}");
    }
    else if (context.Response.StatusCode == StatusCodes.Status401Unauthorized)
    {
        context.Response.ContentType = "application/json";
        await context.Response.WriteAsync("{\"error\": \"You must be logged in to access this resource!\"}");
    }
});
//app.Use(async (context, next) =>
//{
//    context.Features.Get<IHttpMaxRequestBodySizeFeature>()!.MaxRequestBodySize = 50 * 1024 * 1024; // 50MB
//    await next();
//});

app.Use(async (context, next) =>
{
    var origin = context.Request.Headers["Origin"].ToString();
    Console.WriteLine($"Origin: {origin}");
    await next();
});

app.MapControllers();
app.MapGet("/", () => "Welcome to the Music API!");

app.Run();
