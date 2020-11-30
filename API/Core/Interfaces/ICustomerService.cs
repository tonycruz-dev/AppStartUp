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
        Task<Customer> AddCustomerAsync(Customer customer);
        Task<Customer> UpdateCustomerAsync(Customer customer);
        Task<CustomerDto> GetCustomerByIdAsync(int Id);
        Task<Customer> DeleteCustomerAsync(int Id);
        Task<IReadOnlyList<CustomerDto>> GetCustomersAsyc();
        Task<IReadOnlyList<CustomerDto>> GetCustomersByUserIdAsyc(string userId);
        Task<PagedList<CustomerDto>> GetPaginationCustomersAsyc(CustomerParams customerParams);
    }
}
