using CFFService.service;
using County.Service;
using Material.Service;
using Newsletter.Services;
using Quotation.Request.Service;
using Space.Service;
using Inquiry.Service;

var builder = WebApplication.CreateBuilder(args);
var port = Environment.GetEnvironmentVariable("PORT") ?? "8080";

var url = $"http://0.0.0.0:{port}";
var target = Environment.GetEnvironmentVariable("TARGET") ?? "World";

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(options =>
         {
             /**Allow cff website scheme*/
             options.AddPolicy(name: "cff_web",
                             builder =>
                             {
                                 builder.WithOrigins(
                                    "http://localhost:4200",
                                    "http://localhost:5291",
                                  "https://localhost:7130",
                                                     "http://127.0.0.1:5000",
                                                     "https://cff-v2.web.app",
                                                     "https://clutterfreefinds.com").AllowAnyHeader().AllowAnyMethod();
                             });
         });
builder.Services.AddScoped<INewsletterService, NewsletterServices>();
builder.Services.AddScoped<IQuotationRequestService, QuotationRequestService>();
builder.Services.AddScoped<ICFFService, CFFServices>();
builder.Services.AddScoped<ISpaceServices, SpaceServices>();
builder.Services.AddScoped<IMaterialServices, MaterialServices>();
builder.Services.AddScoped<ICountyServices, CountyServices>();
builder.Services.AddScoped<IInquiryService, InquiryRequestService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseHttpsRedirection();
}

app.UseCors("cff_web");

app.UseAuthorization();

app.UseRouting();

app.MapControllers();

app.MapGet("/", () => "Hello world");

app.Run();