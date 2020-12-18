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

        public async Task<CustomerWithJobItemDto> GetCustomerByIdAsync(int Id)
        {
            return await _context
                .Customers
                .Include(ji => ji.JobItems)
                .Include(inv => inv.Invoices)
                .ProjectTo<CustomerWithJobItemDto>(_mapper.ConfigurationProvider)
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
            
            query = customerParams.OrderBy switch
            {
                "companyName" => query.OrderByDescending(u => u.Id),
                _ => query.OrderBy(u => u.CustomerName)
            };

            return await PagedList<CustomerDto>.CreateAsync(query.ProjectTo<CustomerDto>(_mapper
                .ConfigurationProvider).AsNoTracking(),
                    customerParams.PageNumber, customerParams.PageSize);
        }

        // Manage JobItems
        public async Task<JobItem> AddJobItemAsync(JobItem jobItem)
        {
            _context.JobItems.Add(jobItem);
            await _context.SaveChangesAsync();
            return jobItem;
        }

        public async Task<JobItem> UpdateJobItemAsync(JobItem jobItem)
        {
            _context.Entry(jobItem).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return jobItem;
        }

        public async Task<JobItemDto> GetJobItemByIdAsync(int Id)
        {
            return await _context
               .JobItems
               .ProjectTo<JobItemDto>(_mapper.ConfigurationProvider)
               .SingleOrDefaultAsync(cus => cus.Id == Id);
        }

        public async Task<IReadOnlyList<JobItemDto>> GetJobItemByCustomerIdAsync(int customerId)
        {
            return await _context
              .JobItems
              .Where(ji => ji.CustomerId == customerId)
              .ProjectTo<JobItemDto>(_mapper.ConfigurationProvider)
              .ToListAsync();
        }
        public async Task<JobItem> DeleteJobItemAsync(int Id)
        {
            var cpd = await _context.JobItems
                .FirstOrDefaultAsync(cp => cp.Id == Id);
            _context.JobItems.Remove(cpd);
            await _context.SaveChangesAsync();
            return cpd;
        }

        // Invoice Manager
        public async Task<Invoice> AddInvoiceAsync(Invoice invoice)
        {

            _context.Invoices.Add(invoice);
            await _context.SaveChangesAsync();
            return invoice;
        }

        public async Task<Invoice> UpdateInvoiceAsync(Invoice invoice)
        {
            _context.Entry(invoice).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return invoice;
        }

        public async Task<InvoiceDto> GetInvoiceByIdAsync(int Id)
        {
            return await _context
              .Invoices
              .ProjectTo<InvoiceDto>(_mapper.ConfigurationProvider)
              .SingleOrDefaultAsync(cus => cus.Id == Id);
        }

        public async Task<IReadOnlyList<InvoiceDto>> GeInvoiceByCustomerIdAsync(int customerId)
        {
            return await _context
               .Invoices
               .Where(inv => inv.CustomerId == customerId)
               .ProjectTo<InvoiceDto>(_mapper.ConfigurationProvider)
               .ToListAsync();
        }

        public async Task<Invoice> DeleteInvoiceAsync(int Id)
        {
            var cpd = await _context.Invoices
               .FirstOrDefaultAsync(cp => cp.Id == Id);
            _context.Invoices.Remove(cpd);
            await _context.SaveChangesAsync();
            return cpd;
        }

        public async Task<InvoiceItem> AddInvoiceItemAsync(InvoiceItem invoiceItem)
        {
            _context.InvoiceItems.Add(invoiceItem);
            await _context.SaveChangesAsync();
            return invoiceItem;
        }

        public async Task<InvoiceItem> UpdateInvoiceItemAsync(InvoiceItem invoiceItem)
        {
            _context.Entry(invoiceItem).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return invoiceItem;
        }

        public async Task<InvoiceItemDto> GetInvoiceItemByIdAsync(int Id)
        {
            return await _context
             .InvoiceItems
             .ProjectTo<InvoiceItemDto>(_mapper.ConfigurationProvider)
             .SingleOrDefaultAsync(cus => cus.Id == Id);
        }

        public async Task<IReadOnlyList<InvoiceItemDto>> GeInvoiceItemByCustomerIdAsync(int customerId)
        {
            return await _context
               .InvoiceItems
               .Where(inv => inv.Id == customerId)
               .ProjectTo<InvoiceItemDto>(_mapper.ConfigurationProvider)
               .ToListAsync();
        }

        public async Task<InvoiceItem> DeleteInvoiceItemAsync(int Id)
        {
            var cpd = await _context.InvoiceItems
               .FirstOrDefaultAsync(cp => cp.Id == Id);
            _context.InvoiceItems.Remove(cpd);
            await _context.SaveChangesAsync();
            return cpd;
        }
    }
}
