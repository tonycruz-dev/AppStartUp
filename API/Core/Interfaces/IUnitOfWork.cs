using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Core.Interfaces
{
    public interface IUnitOfWork
    {
        ICustomerService CustomerService { get; }
        Task<bool> Complete();

        bool HasChanges();
    }
}
