using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Helpers
{
    public class CustomerParams: PaginationParams
    {
        public string CompanyName { get; set; }
        public string CustomerName { get; set; }
        public string userId { get; set; }
        public string Search { get; set; }
        public string OrderBy { get; set; } = "CustomerName";
    }
}
