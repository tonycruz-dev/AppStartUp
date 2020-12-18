using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class InvoiceInsertDto
    {
        public int Id { get; set; }
        public int CustomerId { get; set; }
        public string Title { get; set; }
        public string InvoiceAddress { get; set; }
        public DateTime InvoiceDate { get; set; } = DateTime.Now;
        public bool InvoiceYesNo { get; set; } = false;
        public decimal TotalValue { get; set; } = 0.0M;
        public decimal TotalPaid { get; set; } = 0M;
        public DateTime? DatePaid { get; set; }
        public bool IsPosted { get; set; } = false;
        public List<InvoiceItemDto> InvoiceItems { get; set; }
    }
}
