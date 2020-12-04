using API.Core.Interfaces;
using API.Infrastructure.Data;
using API.Infrastructure.Services;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Extensions
{
    public static class ScopedServicesExtensions
    {
        public static IServiceCollection AddScopedServices(this IServiceCollection services, IConfiguration config)
        {
            services.AddScoped<ITokenService, TokenService>();
            services.AddScoped<IUnitOfWork, UnitOfWork>();
            //services.AddScoped<ICustomerService, CustomersServices>();

            return services;
        }
    }
}
