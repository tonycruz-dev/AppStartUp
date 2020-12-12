﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Core.Entities
{
    public class InvoiceItem
    {
        public int Id { get; set; }
        public int InvoiceId { get; set; }
        public int JobItem { get; set; }
        public string ItemDescription { get; set; }
        public DateTime JobDate { get; set; }
        public DateTime IvoiceItemDate { get; set; }

        public decimal Amount { get; set; } = 0M;
        public Invoice Invoice { get; set; }
    }
}
