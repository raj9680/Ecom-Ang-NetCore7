using API.Errors;
using Core.Interfaces;
using Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions
{
    public static class ApplicationServicesExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services,
            IConfiguration config)
            {
                services.AddEndpointsApiExplorer();
                services.AddSwaggerGen();
                // Own
                services.AddDbContext<StoreContext>(opt => {
                    opt.UseSqlite(config.GetConnectionString("DefaultConnection"));
                });
                services.AddScoped<IProductRepository, ProductRepository>(); // scope of http
                services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
                services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());


                #region For validation api error override default
                services.Configure<ApiBehaviorOptions>(options => 
                {
                    options.InvalidModelStateResponseFactory = actionContext => 
                    {
                        var errors = actionContext.ModelState
                        .Where(e => e.Value.Errors.Count > 0)
                        .SelectMany(x => x.Value.Errors)
                        .Select(x => x.ErrorMessage).ToArray();

                        var errorResponse = new ApiValidationErrorResponse
                        {
                            Errors = errors
                        };

                        return new BadRequestObjectResult(errorResponse);
                    };
                });
            #endregion


            services.AddCors(opt =>
            {
                opt.AddPolicy("CorsPolicy", policy =>
                {
                    policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("https://localhost:4200");
                });
            });
            
            return services;
            }   
    }
}