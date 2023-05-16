using API.Extensions;
using API.Middleware;
using Core.Entities.Identity;
using Infrastructure.Data;
using Infrastructure.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

/// Add services to the container.
builder.Services.AddControllers();

#region ExtensionConfigurationClass
builder.Services.AddApplicationServices(builder.Configuration);
builder.Services.AddIdentityServices(builder.Configuration);
builder.Services.AddSwaggerDocumentation();
#endregion

WebApplication app = builder.Build(); // var

/// Configure the HTTP request pipeline.
app.UseMiddleware<ExceptionMiddleware>(); /// Custom Middleware to override default null ref error exceptions

app.UseStatusCodePagesWithReExecute("/errors/{0}");  /// hidden bydefault, middleware for notfound endpoint


if (app.Environment.IsDevelopment())
{
    //app.UseSwagger();
    //app.UseSwaggerUI();   // Move to SwaggerServiceExtension

    /// from SwaggerServiceExtension
    app.UseSwaggerDocumentation();
}

///app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseCors("CorsPolicy");

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

#region MigrationCustom

using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;
var context = services.GetRequiredService<StoreContext>();

var identityContext = services.GetRequiredService<AppIdentityDbContext>();
var userManager = services.GetRequiredService<UserManager<AppUser>>();

var logger = services.GetRequiredService<ILogger<Program>>();
try
{
    await context.Database.MigrateAsync();
    await identityContext.Database.MigrateAsync();
    await StoreContextSeed.SeedAsync(context);
    await AppIdentityDbContextSeed.SeedUsersAsync(userManager);
}
catch(Exception ex)
{
    logger.LogError("An error occured during migration", ex);
}

#endregion EndMigrationCustom

app.Run();
