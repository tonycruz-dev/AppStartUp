using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class JobItemDto
    {
        public int Id { get; set; }
        public int CustomerId { get; set; }
        public string Title { get; set; }
        public string JobDescription { get; set; }
        public DateTime JobDate { get; set; }
        public decimal Amount { get; set; } = 0M;
        public bool IsInvoiced { get; set; }
    }
}
