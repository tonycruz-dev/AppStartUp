using System;
using System.Collections.ObjectModel;

namespace API.Core.Entities
{
    public class Invoice
    {
        public int Id { get; set; }
        public int CustomerId { get; set; }
        public string Title { get; set; }
        public string InvoiceAddress { get; set; }
        public DateTime InvoiceDate { get; set; } = DateTime.UtcNow;
        public bool InvoiceYesNo { get; set; } = false;
        public decimal TotalValue { get; set; } = 0.0M;
        public decimal TotalPaid { get; set; } = 0M;
        public DateTime? DatePaid { get; set; }
        public bool IsPosted { get; set; } = false;
        public string InvoiceNote { get; set; }
        public Customer Customer { get; set; }
        public Collection<InvoiceItem> InvoiceItems { get; set; }
    }
}
