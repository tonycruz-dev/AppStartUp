using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace API.Core.Entities
{
    public class Customer
    {
        public int Id { get; set; }
        public string CustomerName { get; set; }
        public string CompanyName { get; set; }
        public string Address1 { get; set; }
        public string Address2 { get; set; }
        public string Address3 { get; set; }
        public string Address4 { get; set; }
        public string Address5 { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Gender { get; set; }
        public bool Discontinued { get; set; }
        public string PhotoUrl { get; set; }
        public string NoteInfo { get; set; }
        public AppUser AppUser { get; set; }
        public string AppUserId { get; set; }
        public Collection<Invoice> Invoices { get; set; }
    }
}
