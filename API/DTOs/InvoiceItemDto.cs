using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class InvoiceItemDto
    {
        public int Id { get; set; }
        public int InvoiceId { get; set; }
        public int JobItem { get; set; }
        public string ItemDescription { get; set; }
        public DateTime? JobDate { get; set; }
        public DateTime? IvoiceItemDate { get; set; }
        public decimal Amount { get; set; } = 0M;
    }
}
