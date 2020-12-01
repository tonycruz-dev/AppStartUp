using API.Core.Entities;
using API.Core.Interfaces;
using API.DTOs;
using API.Helpers;
using API.Infrastructure.Data;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Infrastructure.Services
{
    public class CustomersServices : ICustomerService
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public CustomersServices(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<Customer> AddCustomerAsync(Customer customer)
        {
            _context.Customers.Add(customer);
            await _context.SaveChangesAsync();
            return customer;
        }

        public async Task<Customer> DeleteCustomerAsync(int Id)
        {
            
            var cpd = await _context.Customers
                .FirstOrDefaultAsync(cp => cp.Id == Id);
            _context.Customers.Remove(cpd);
            await _context.SaveChangesAsync();
            return cpd;
        }

        public async Task<IReadOnlyList<CustomerDto>> GetCustomersAsyc()
        {
            return await _context.
                Customers
                .ProjectTo<CustomerDto>(_mapper.ConfigurationProvider)
                .ToListAsync();
        }

        public async Task<Customer> UpdateCustomerAsync(Customer customer)
        {
            _context.Entry(customer).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return customer;
        }
        public async Task<IReadOnlyList<CustomerDto>> GetCustomersByUserIdAsyc(string userId)
        {
            return await _context.Customers.Where(cus => cus.AppUserId == userId)
                .ProjectTo<CustomerDto>(_mapper.ConfigurationProvider)
                .ToListAsync();
        }

        public async Task<CustomerDto> GetCustomerByIdAsync(int Id)
        {
            return await _context
                .Customers
                .ProjectTo<CustomerDto>(_mapper.ConfigurationProvider)
                .SingleOrDefaultAsync(cus => cus.Id == Id);
        }

        public async Task<PagedList<CustomerDto>> GetPaginationCustomersAsyc(CustomerParams customerParams)
        {
            var query = _context.Customers.AsQueryable();

            if (customerParams.Search != null)
            {
                query = query.Where(
                   c => c.CompanyName.ToLower().Contains(customerParams.Search.ToLower()) || 
                   c.CustomerName.ToLower().Contains(customerParams.Search.ToLower()));
            }
            //  != customerParams.CompanyName);
            //query = query.Where(c => c.CustomerName.ToLower().Contains(customerParams.CustomerName.ToLower()));


            query = customerParams.OrderBy switch
            {
                "companyName" => query.OrderByDescending(u => u.Id),
                _ => query.OrderBy(u => u.CustomerName)
            };

            return await PagedList<CustomerDto>.CreateAsync(query.ProjectTo<CustomerDto>(_mapper
                .ConfigurationProvider).AsNoTracking(),
                    customerParams.PageNumber, customerParams.PageSize);
        }
    }
}
