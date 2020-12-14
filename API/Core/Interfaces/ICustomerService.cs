using API.Core.Entities;
using API.DTOs;
using API.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Core.Interfaces
{
   public interface ICustomerService
    {
        // Customers
        Task<Customer> AddCustomerAsync(Customer customer);
        Task<Customer> UpdateCustomerAsync(Customer customer);
        Task<CustomerWithJobItemDto> GetCustomerByIdAsync(int Id);
        Task<Customer> DeleteCustomerAsync(int Id);
        Task<IReadOnlyList<CustomerDto>> GetCustomersAsyc();
        Task<IReadOnlyList<CustomerDto>> GetCustomersByUserIdAsyc(string userId);
        Task<PagedList<CustomerDto>> GetPaginationCustomersAsyc(CustomerParams customerParams);

        // manage job items
        Task<JobItem> AddJobItemAsync(JobItem jobItem);
        Task<JobItem> UpdateJobItemAsync(JobItem jobItem);
        Task<JobItemDto> GetJobItemByIdAsync(int Id);
        Task<IReadOnlyList<JobItemDto>> GetJobItemByCustomerIdAsync(int customerId);
        Task<JobItem> DeleteJobItemAsync(int Id);

        // manage Invoice 
        Task<Invoice> AddInvoiceAsync(Invoice invoice);
        Task<Invoice> UpdateInvoiceAsync(Invoice invoice);
        Task<InvoiceDto> GetInvoiceByIdAsync(int Id);
        Task<IReadOnlyList<InvoiceDto>> GeInvoiceByCustomerIdAsync(int customerId);
        Task<Invoice> DeleteInvoiceAsync(int Id);

        // manage Invoice items
        Task<InvoiceItem> AddInvoiceItemAsync(InvoiceItem invoiceItem);
        Task<InvoiceItem> UpdateInvoiceItemAsync(InvoiceItem invoiceItem);
        Task<InvoiceItemDto> GetInvoiceItemByIdAsync(int Id);
        Task<IReadOnlyList<InvoiceItemDto>> GeInvoiceItemByCustomerIdAsync(int customerId);
        Task<InvoiceItem> DeleteInvoiceItemAsync(int Id);

    }
}
